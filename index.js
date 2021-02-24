const qrImage = require('qr-image')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const size = 255  // 重置图片的分辨率px

/**
 * name是生成二维码图片的名称
 * text是二维码中的文本内容
 * 生成的原图在qrfiles文件夹中
 * 重新设置尺寸的图在resizefiles文件夹中
 */
const textArr = [
    {
        name: '百度.png',
        text: 'https://www.baidu.com'
    },
    {
        name: '淘宝.png',
        text: 'https://taobao.com'
    },
    {
        name: '谷歌.png',
        text: 'https://www.google.com/'
    },
    {
        name: '4.png',
        text: '而我让他'
    },
    {
        name: '5.png',
        text: 'sdf'
    }
]

for (let i = 0; i < textArr.length; i++) {
    const item = textArr[i]
    const qrcode = qrImage.image(item.text, {
        ec_level: 'H',   //设置容错率level为30%
        margin: 1,
        size: 5
    })
    const filePath = path.join(__dirname, 'qrfiles', item.name)
    const writeStream = fs.createWriteStream(filePath)
    qrcode.pipe(writeStream).on('finish', function () {
        console.log(`${item.name} 生成完成`)
    })
    writeStream.on('close', () => {
        const resizeFilePath = path.join(__dirname, 'resizefiles', item.name)
        sharp(filePath)
            .resize(size) // 重置大小
            .toFile(resizeFilePath, (err, info) => {
                console.log(`${item.name} 重置尺寸完成`)
            });
    })
}

