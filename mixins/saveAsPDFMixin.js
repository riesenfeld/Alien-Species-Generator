import { jsPDF } from 'jspdf'
// import { TestWatcher } from 'jest'
import { finlandicaRegular } from '../assets/jsPDFFontDefinitions/Finlandica-Regular.js'
import { finlandicaBold } from '../assets/jsPDFFontDefinitions/Finlandica-Bold.js'

export const saveAsPDFMixin = {
  methods: {
    /**
     * Version 2.5.1 docs: https://raw.githack.com/MrRio/jsPDF/master/docs/index.html
     *
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

    drawAndAdvance(doc, string, fontSize, textType, topPosition) {
      const lineHeightFactor = 1.15
      const maxWidth = 500
      let marginLeft = 20

      if (textType === 'superheading') {
        doc.setFont('Finlandica-Bold')
        /** Leaving this here in case I want to do something special */
      } else if (textType === 'heading') {
        doc.setFont('Finlandica-Bold')
      } else if (textType === 'subheading') {
        doc.setFont('Finlandica-Bold')
        marginLeft = 25
      } else {
        doc.setFont('Finlandica-Regular')
        marginLeft = 25
      }

      doc.setFontSize(fontSize)
      const stringArray = doc.splitTextToSize(string, maxWidth)
      doc.text(stringArray, marginLeft, topPosition, {
        baseline: 'top',
        lineHeightFactor,
      })

      topPosition += stringArray.length * fontSize * lineHeightFactor

      return topPosition
    },

    drawPDF(doc, speciesName, traits) {
      let topPosition = 10
      topPosition = this.drawAndAdvance(
        doc,
        speciesName,
        28,
        'superheading',
        topPosition
      )
      topPosition += 10
      traits.forEach((trait) => {
        topPosition = this.drawAndAdvance(
          doc,
          trait.main.name,
          18,
          'heading',
          topPosition
        )
        topPosition += 5
        topPosition = this.drawAndAdvance(
          doc,
          trait.main.description,
          12,
          'regular',
          topPosition
        )
        if (trait.styles) {
          topPosition += 5
          topPosition = this.drawAndAdvance(
            doc,
            trait.styles.name,
            12,
            'subheading',
            topPosition
          )
          topPosition += 3
          topPosition = this.drawAndAdvance(
            doc,
            trait.styles.description,
            10,
            'regular',
            topPosition
          )
        }
        if (trait.additions) {
          topPosition += 5
          topPosition = this.drawAndAdvance(
            doc,
            trait.additions.name,
            12,
            'subheading',
            topPosition
          )
          topPosition = this.drawAndAdvance(
            doc,
            trait.additions.description,
            10,
            'regular',
            topPosition
          )
        }
        topPosition += 10
      })
    },
    saveAsPDF(speciesName, traits) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ unit: 'pt' })
      this.addFont(doc)
      this.drawPDF(doc, speciesName, traits)
      doc.save('a4.pdf')
    },
  },
}
