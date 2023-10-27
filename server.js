const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function addWatermarkToPdf(pdfPath, watermarkPath, outputPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const watermarkBuffer = fs.readFileSync(watermarkPath);

  const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const watermarkImage = await pdfDoc.embedPng(watermarkBuffer);

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    const watermarkWidth = 200;
    const watermarkHeight =
      (watermarkWidth / watermarkImage.width) * watermarkImage.height;
    page.drawImage(watermarkImage, {
      x: width / 2 - watermarkWidth / 2,
      y: height / 2 - watermarkHeight / 2,
      width: watermarkWidth,
      height: watermarkHeight,
      opacity: 0.5,
    });
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log("Watermark added to all pages of the PDF successfully!");
}

const pdfPath = "input.pdf";
const watermarkPath = "watermark.png";
const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkPath, outputPath);
