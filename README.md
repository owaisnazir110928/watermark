# PDF Watermarking Tool

This Node.js application adds a rotated watermark to every page of a PDF document. The watermark image is placed in the background with a specified rotation angle.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. **Clone the repository** or download the ZIP file:

    ```
    git clone https://github.com/username/pdf-watermark-tool.git
    ```

2. **Navigate to the project directory**:

    ```
    cd pdf-watermark-tool
    ```

3. **Install dependencies** using npm or yarn:

    ```
    npm install
    ```

## Usage

1. **Place your files**:
   - **Input PDF**: Place your input PDF file in the project directory and name it `input.pdf`.
   - **Watermark Image**: Place your watermark image file (in PNG format) in the project directory and name it `watermark.png`.

2. **Configure Settings**:

   - **Output File Name**: Modify the `outputPath` variable in the `server.js` file if you want to change the output file name.

        ```
        const outputPath = "output.pdf";
        ```

3. **Run the Application**:

    ```
    node server.js
    ```

4. **Processed PDF**: The processed PDF file with the watermark will be saved as `output.pdf` in the project directory.
