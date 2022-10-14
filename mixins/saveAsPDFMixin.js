import { jsPDF } from 'jspdf'
import { finlandicaRegular } from '../assets/jsPDFFontDefinitions/Finlandica-Regular.js'
import { finlandicaBold } from '../assets/jsPDFFontDefinitions/Finlandica-Bold.js'

export const saveAsPDFMixin = {
  created() {
    console.log('Hello from the mixin!')
  },
  methods: {
    /**
     * Font files generated from: https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
     * Referencing this tutorial: https://www.devlinpeck.com/tutorials/jspdf-custom-font
     */

    addFont(jsPDFInstance) {
      jsPDFInstance.addFileToVFS('Finlandica-Bold.ttf', finlandicaBold)
      jsPDFInstance.addFont('Finlandica-Bold.ttf', 'Finlandica-Bold', 'normal')

      jsPDFInstance.addFileToVFS('Finlandica-Regular.ttf', finlandicaRegular)
      jsPDFInstance.addFont(
        'Finlandica-Regular.ttf',
        'Finlandica-Regular',
        'normal'
      )
    },
    drawPDF(doc, traits) {
      /* Size of an A4 page in pts */
      const pageWidth = 595.23809
      const pageHeight = 841.83673
      const leftStart = pageWidth / 10
      let topStart = pageHeight / 20
      const rectWidth = pageWidth * 0.8
      const rectHeight = pageHeight * 0.15
      const headingHeight = rectHeight / 9.6
      const textHeight = rectHeight / 10.8
      const headingMarginTop = headingHeight / 3
      const headingMarginBottom = headingHeight / 3
      const headingMarginLeft = 3
      const textMarginLeft = 6

      // doc.setDrawColor(0)
      doc.setFont('Finlandica-Bold')
      doc.setFontSize(24)
      // doc.text(speciesName, leftStart, topStart)
      doc.text('Alien Name', leftStart, topStart)
      topStart += 30

      traits.forEach((trait) => {
        doc.setFont('Finlandica-Bold')
        // doc.setFillColor(colors[i][0], colors[i][1], colors[i][2])
        // doc.rect(leftStart, topStart, rectWidth, rectHeight, "F")
        doc.setFontSize(headingHeight)
        doc.text(
          trait.main.name,
          leftStart + headingMarginLeft,
          topStart + headingMarginTop,
          { baseline: 'top' }
        )
        const textStart =
          topStart + headingHeight + headingMarginTop + headingMarginBottom
        doc.setFont('Finlandica-Regular')
        doc.setFontSize(textHeight)
        doc.text(
          doc.splitTextToSize(
            trait.main.description,
            rectWidth - textMarginLeft
          ),
          leftStart + textMarginLeft,
          textStart,
          { baseline: 'top' }
        )
        topStart += rectHeight
      })
    },
    saveAsPDF(traits) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ unit: 'pt' })
      this.addFont(doc)
      this.drawPDF(doc, traits)
      doc.save('a4.pdf')
    },
  },
}
