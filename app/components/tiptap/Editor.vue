<template>
  <UContainer
    class="mx-auto w-full flex-grow flex flex-col p-0 sm:px-0 lg:px-0"
    @click="editor?.commands.focus()"
  >
    <TiptapToolbar
      :editor="editor"
    />

    <EditorContent
      :editor="editor"
      class="prose prose-neutral dark:prose-invert"
    />
  </UContainer>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change'])

// const isEditable = ref<boolean>(true)

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'props.placeholder'
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline,
    Document,
    Paragraph,
    Text,
    Code,
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false
          }

          // disallowed protocols
          const disallowedProtocols = ['ftp', 'file', 'mailto']
          const protocol = parsedUrl.protocol.replace(':', '')

          if (disallowedProtocols.includes(protocol)) {
            return false
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

          if (!allowedProtocols.includes(protocol)) {
            return false
          }

          // disallowed domains
          const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
          const domain = parsedUrl.hostname

          if (disallowedDomains.includes(domain)) {
            return false
          }

          // all checks have passed
          return true
        } catch {
          return false
        }
      },
      shouldAutoLink: url => {
        try {
          // construct URL
          const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
          const domain = parsedUrl.hostname

          return !disallowedDomains.includes(domain)
        } catch {
          return false
        }
      }
    }),
    Table,
    TableCell,
    TableHeader,
    TableRow
  ],
  onUpdate({ editor }) {
    emit('change', editor.getHTML())
  }
})

// watch(
//   () => props.content,
//   (val: any) => {
//     editor.value?.commands.setContent(val)
//   },
//   {
//     deep: true
//   }
// )

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.ProseMirror {
  outline: none;
  box-shadow: none;
}

.ProseMirror:focus {
  outline: none;
  box-shadow: none;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 1.25rem 1rem 1.25rem 1.25rem;
    list-style: initial !important;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
    line-height: calc(2 / 1.5);
  }

  h2 {
    font-size: 1.25rem;
    line-height: calc(1.75 / 1.25);
  }

  h3 {
    font-size: 1.125rem;
    line-height: calc(1.75 / 1.125);
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
    line-height: calc(1.5 / 1);
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--ui-bg-elevated);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  pre {
    background-color: var(--ui-bg-elevated);
    border-radius: 0.5rem;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--ui-bg-accented);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--ui-bg-accented);
    margin: 2rem 0;
  }
}
</style>
