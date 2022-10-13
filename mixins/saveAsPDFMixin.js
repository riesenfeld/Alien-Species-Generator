import { jsPDF } from 'jspdf'

export const saveAsPDFMixin = {
  created() {
    console.log('Hello from the mixin!')
  },
  methods: {
    saveAsPDF() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF()

      doc.text('Hello world!', 10, 10)
      doc.save('a4.pdf')
    },
  },
}
