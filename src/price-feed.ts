import { ethers } from 'ethers';

// Địa chỉ của hợp đồng Chainlink Price Feed cho cặp RON/USD trên mạng Ronin Saigon
const PRICE_FEED_ADDRESS = '0x7f99817d87bad03ea21e05112ca799d715730cd0';

// ABI (Application Binary Interface) của hợp đồng Price Feed
// Chỉ cần các hàm mà chúng ta sẽ sử dụng
const PRICE_FEED_ABI = [
    // Hàm lấy giá mới nhất
    'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    // Hàm lấy số thập phân để tính toán giá chính xác
    'function decimals() external view returns (uint8)'
];

// Hàm chính để lấy giá RON/USD
async function getRONPrice() {
    try {
        // Kết nối đến mạng Ronin Saigon
        const provider = new ethers.JsonRpcProvider('https://saigon-testnet.roninchain.com/rpc');

        // Tạo đối tượng hợp đồng Price Feed
        const priceFeed = new ethers.Contract(PRICE_FEED_ADDRESS, PRICE_FEED_ABI, provider);

        // Lấy số thập phân để tính toán giá chính xác
        const decimals = await priceFeed.decimals();

        // Lấy dữ liệu giá mới nhất
        const roundData = await priceFeed.latestRoundData();

        // Tính toán giá thực từ dữ liệu blockchain
        // Chia cho 10^decimals để có giá chính xác
        const price = Number(roundData.answer) / Math.pow(10, decimals);

        // Hiển thị thông tin
        console.log('\n=== Thông tin giá RON/USD từ Chainlink ===');
        console.log(`Giá hiện tại: $${price.toFixed(4)} USD`);
        console.log(`Cập nhật lúc: ${new Date(Number(roundData.updatedAt) * 1000).toLocaleString()}`);
        console.log(`ID vòng cập nhật: ${roundData.roundId}`);

    } catch (error: any) {
        console.error('Có lỗi xảy ra:', error.message);
    }
}

// Chạy chương trình
console.log('Đang kết nối với Chainlink Price Feed trên Ronin Saigon...');
getRONPrice().catch(error => {
    console.error('Lỗi chương trình:', error);
});