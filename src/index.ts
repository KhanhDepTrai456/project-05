import { ethers } from 'ethers';

// Định nghĩa địa chỉ RPC của mạng Ronin Saigon
const RONIN_SAIGON_RPC = 'https://saigon-testnet.roninchain.com/rpc';

// ABI tối thiểu cho Token ERC20 (chỉ cần hàm balanceOf và decimals)
const ERC20_ABI = [
    // Hàm lấy số dư của một địa chỉ
    'function balanceOf(address account) view returns (uint256)',
    // Hàm lấy số chữ số thập phân của token
    'function decimals() view returns (uint8)',
    // Hàm lấy tên token
    'function name() view returns (string)',
    // Hàm lấy ký hiệu token
    'function symbol() view returns (string)'
];

// Hàm kiểm tra số dư Token ERC20
async function checkBalance(walletAddress: string, tokenAddress: string) {
    try {
        // Tạo kết nối đến mạng Ronin Saigon
        const provider = new ethers.JsonRpcProvider(RONIN_SAIGON_RPC);

        // Kiểm tra tính hợp lệ của địa chỉ ví và địa chỉ token
        if (!ethers.isAddress(walletAddress)) {
            throw new Error('Địa chỉ ví không hợp lệ!');
        }
        if (!ethers.isAddress(tokenAddress)) {
            throw new Error('Địa chỉ token không hợp lệ!');
        }

        // Tạo đối tượng contract để tương tác với token ERC20
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

        // Lấy thông tin của token
        const [name, symbol, decimals, balance] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.balanceOf(walletAddress)
        ]);

        // Chuyển đổi số dư từ Wei sang đơn vị token sử dụng ethers.formatUnits
        const balanceInToken = ethers.formatUnits(balance, decimals);

        console.log('\n=== Thông tin số dư Token ERC20 ===');
        console.log(`Tên Token: ${name} (${symbol})`);
        console.log(`Địa chỉ Token: ${tokenAddress}`);
        console.log(`Địa chỉ ví: ${walletAddress}`);
        console.log(`Số dư: ${balanceInToken} ${symbol}`);

    } catch (error: any) {
        console.error('Có lỗi xảy ra:', error.message);
    }
}

// Hàm main để chạy chương trình
async function main() {
    // Lấy địa chỉ ví và địa chỉ token từ tham số dòng lệnh
    const walletAddress = process.argv[2] || '0xE854E48E25317753fAF9B39833Df3E0C9e9f25b6';
    // Ví dụ: Địa chỉ của token RON trên mạng Ronin Saigon
    const tokenAddress = process.argv[3] || '0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f7c';
    
    console.log('Chương trình kiểm tra số dư Token ERC20 trên mạng Ronin Saigon');
    console.log('Đang kết nối và kiểm tra số dư...');
    
    await checkBalance(walletAddress, tokenAddress);
}

// Chạy chương trình
main().catch(error => {
    console.error('Lỗi chương trình:', error);
});