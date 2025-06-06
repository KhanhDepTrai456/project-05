# Kiểm tra số dư Token ERC20 trên Ronin Saigon

Đây là một dự án TypeScript đơn giản giúp kiểm tra số dư của Token ERC20 trong ví trên mạng Ronin Saigon (mạng thử nghiệm). Dự án này sử dụng thư viện ethers.js để tương tác trực tiếp với smart contract của Token ERC20.

## Yêu cầu hệ thống

- Node.js (phiên bản 14.0.0 trở lên)
- npm (Node Package Manager)

## Cài đặt

1. Clone hoặc tải dự án về máy

2. Mở terminal và di chuyển vào thư mục dự án

3. Cài đặt các thư viện cần thiết:
```bash
npm install
```

## Cách sử dụng

### Chạy với địa chỉ mặc định
```bash
npm start
```

### Chạy với địa chỉ tùy chọn
```bash
npm start <địa_chỉ_ví> <địa_chỉ_token>
```

Ví dụ:
```bash
npm start 0xabcd... 0x1234...
```

## Giải thích code

1. **Kết nối với mạng Ronin Saigon**:
   - Sử dụng JsonRpcProvider để kết nối với node của mạng Ronin Saigon
   - URL RPC: https://saigon-testnet.roninchain.com/rpc

2. **Tương tác với Token ERC20**:
   - Sử dụng ABI (Application Binary Interface) tối thiểu để gọi các hàm của Token ERC20
   - Các hàm được sử dụng: balanceOf, decimals, name, symbol

3. **Xử lý số dư**:
   - Lấy số dư từ blockchain (dạng Wei)
   - Chuyển đổi sang đơn vị Token dễ đọc bằng cách chia cho 10^decimals

## Lưu ý

- Đảm bảo địa chỉ ví và địa chỉ token là hợp lệ
- Cần có kết nối internet để tương tác với mạng Ronin Saigon
- Không cần private key vì chỉ đọc thông tin (view function)

## Tài liệu tham khảo

- [Ethers.js Documentation](https://docs.ethers.org/)
- [ERC20 Token Standard](https://ethereum.org/vi/developers/docs/standards/tokens/erc-20/)
- [Ronin Blockchain Documentation](https://docs.roninchain.com/)