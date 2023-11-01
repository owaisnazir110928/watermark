const { PDFDocument, rgb, degrees } = require("pdf-lib");

async function addWatermarkToPdf(pdfPath, text, outputPath) {
  const text = `Accessed by: ${UserDetails?.email}\nEmail ID: ${UserDetails?.name}\nPurchased on: ${date}`;
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const textWidth = 250;
  const textHeight = 45;
  const opacity = 0.14;
  const fontSize = 16;

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    const addWatermark = (x, y) => {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
        opacity,
        rotate: degrees(20.25),
      });
    };

    addWatermark(50, height - 175);
    addWatermark(width / 2 - textWidth / 2, height / 2 - textHeight / 2);
    addWatermark(width - 300, 100);
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log("Watermarks added to PDF successfully!");
}

const pdfPath = "input.pdf";
const utcdate = new Date("01/10/2023");
const date = utcdate.toLocaleDateString();

const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkText, outputPath);
