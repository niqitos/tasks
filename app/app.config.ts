export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue'
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    input: {
      variants: {
        size: {
          md: {
            base: 'text-base'
          }
        }
      }
    },
    textarea: {
      variants: {
        size: {
          md: {
            base: 'text-base'
          }
        }
      }
    }
  }
})
