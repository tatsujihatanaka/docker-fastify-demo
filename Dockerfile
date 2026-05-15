FROM node:20

WORKDIR /app

# 開発用なので、起動時に bash を維持するか
# あるいは ts-node-dev などで待機させる設定にします
CMD ["bash"]
