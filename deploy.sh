#!/bin/bash

# 个人简历网站部署脚本
# 支持 GitHub Pages 部署

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo "⚠️  检测到未提交的更改，请先提交更改"
    git status
    exit 1
fi

# 构建项目
echo "📦 正在构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 创建 gh-pages 分支（如果不存在）
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# 清空 gh-pages 分支
git rm -rf . 2>/dev/null || true

# 复制构建结果到根目录
cp -r dist/* .
rm -rf dist node_modules src public

# 添加 .gitignore 中的文件
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "dist/" >> .gitignore

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages"

# 推送到远程仓库
echo "📤 推送到 GitHub Pages..."
git push origin gh-pages --force

# 切换回主分支
git checkout master

echo "✅ 部署完成！"
echo "🌐 访问地址: https://[your-username].github.io/[your-repo-name]"