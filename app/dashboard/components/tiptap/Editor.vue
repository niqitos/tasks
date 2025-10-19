<template>
  <UFormField
    :label="$t('task.description.label')"
    class="w-full"
    name="description"
  >
    <UContainer
        class="mx-auto w-full flex-grow flex flex-col rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-2.5 sm:px-2.5 lg:px-2.5 pb-1.5 text-sm gap-3.5 text-highlighted bg-default ring ring-inset ring-accented resize-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
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
  </UFormField>
</template>

<script lang="ts" setup>
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
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const { t } = useI18n()

const emit = defineEmits(['change'])

// const isEditable = ref<boolean>(true)

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: t('task.description.placeholder')
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
    TableRow,
    TaskList,
    TaskItem.configure({
      nested: true
    })
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
.tiptap.ProseMirror {
    --tt-collaboration-carets-label: var(--tt-gray-light-900);
    --link-text-color: var(--tt-brand-color-500);
    --thread-text: var(--tt-gray-light-900);
    --placeholder-color: var(--tt-gray-light-a-400);
    --thread-bg-color: var(--tt-color-yellow-inc-2);
    --tiptap-ai-insertion-color: var(--tt-brand-color-600)
}

.dark .tiptap.ProseMirror {
    --tt-collaboration-carets-label: var(--tt-gray-dark-100);
    --link-text-color: var(--tt-brand-color-400);
    --thread-text: var(--tt-gray-dark-900);
    --placeholder-color: var(--tt-gray-dark-a-400);
    --thread-bg-color: var(--tt-color-yellow-dec-2);
    --tiptap-ai-insertion-color: var(--tt-brand-color-400)
}

.tiptap.ProseMirror {
    --tt-checklist-bg-color: var(--tt-gray-light-a-100);
    --tt-checklist-bg-active-color: var(--tt-gray-light-a-900);
    --tt-checklist-border-color: var(--tt-gray-light-a-200);
    --tt-checklist-border-active-color: var(--tt-gray-light-a-900);
    --tt-checklist-check-icon-color: var(--white);
    --tt-checklist-text-active: var(--tt-gray-light-a-500)
}

.dark .tiptap.ProseMirror {
    --tt-checklist-bg-color: var(--tt-gray-dark-a-100);
    --tt-checklist-bg-active-color: var(--tt-gray-dark-a-900);
    --tt-checklist-border-color: var(--tt-gray-dark-a-200);
    --tt-checklist-border-active-color: var(--tt-gray-dark-a-900);
    --tt-checklist-check-icon-color: var(--black);
    --tt-checklist-text-active: var(--tt-gray-dark-a-500)
}

.tiptap.ProseMirror ol,.tiptap.ProseMirror ul {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding-left: 1.5em
}

.tiptap.ProseMirror ol:first-child,.tiptap.ProseMirror ul:first-child {
    margin-top: 0
}

.tiptap.ProseMirror ol:last-child,.tiptap.ProseMirror ul:last-child {
    margin-bottom: 0
}

.tiptap.ProseMirror ol ol,.tiptap.ProseMirror ol ul,.tiptap.ProseMirror ul ol,.tiptap.ProseMirror ul ul {
    margin-top: 0;
    margin-bottom: 0
}

.tiptap.ProseMirror li p {
    margin-top: 0;
    line-height: 1.6
}

.tiptap.ProseMirror ol {
    list-style: decimal
}

.tiptap.ProseMirror ol ol {
    list-style: lower-alpha
}

.tiptap.ProseMirror ol ol ol {
    list-style: lower-roman
}

.tiptap.ProseMirror ul:not([data-type=taskList]) {
    list-style: disc
}

.tiptap.ProseMirror ul:not([data-type=taskList]) ul {
    list-style: circle
}

.tiptap.ProseMirror ul:not([data-type=taskList]) ul ul {
    list-style: square
}

.tiptap.ProseMirror ul[data-type=taskList] {
    padding-left: .25em
}

.tiptap.ProseMirror ul[data-type=taskList] li {
    display: flex;
    flex-direction: row;
    align-items: flex-start
}

.tiptap.ProseMirror ul[data-type=taskList] li:not(:has(>p:first-child)) {
    list-style-type: none
}

.tiptap.ProseMirror ul[data-type=taskList] li[data-checked=true]>div>p {
    opacity: .5;
    text-decoration: line-through
}

.tiptap.ProseMirror ul[data-type=taskList] li[data-checked=true]>div>p span {
    text-decoration: line-through
}

.tiptap.ProseMirror ul[data-type=taskList] li label {
    position: relative;
    padding-top: .375rem;
    padding-right: .5rem
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0
}

.tiptap.ProseMirror ul[data-type=taskList] li label span {
    display: block;
    width: 1em;
    height: 1em;
    border: 1px solid var(--tt-checklist-border-color);
    border-radius: var(--tt-radius-xs,.25rem);
    position: relative;
    cursor: pointer;
    background-color: var(--tt-checklist-bg-color);
    transition: background-color 80ms ease-out,border-color 80ms ease-out
}

.tiptap.ProseMirror ul[data-type=taskList] li label span:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: .75em;
    height: .75em;
    background-color: var(--tt-checklist-check-icon-color);
    opacity: 0;
    -webkit-mask: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.4142%204.58579C22.1953%205.36683%2022.1953%206.63317%2021.4142%207.41421L10.4142%2018.4142C9.63317%2019.1953%208.36684%2019.1953%207.58579%2018.4142L2.58579%2013.4142C1.80474%2012.6332%201.80474%2011.3668%202.58579%2010.5858C3.36683%209.80474%204.63317%209.80474%205.41421%2010.5858L9%2014.1716L18.5858%204.58579C19.3668%203.80474%2020.6332%203.80474%2021.4142%204.58579Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E") center/contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.4142%204.58579C22.1953%205.36683%2022.1953%206.63317%2021.4142%207.41421L10.4142%2018.4142C9.63317%2019.1953%208.36684%2019.1953%207.58579%2018.4142L2.58579%2013.4142C1.80474%2012.6332%201.80474%2011.3668%202.58579%2010.5858C3.36683%209.80474%204.63317%209.80474%205.41421%2010.5858L9%2014.1716L18.5858%204.58579C19.3668%203.80474%2020.6332%203.80474%2021.4142%204.58579Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E") center/contain no-repeat
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span {
    background: var(--tt-checklist-bg-active-color);
    border-color: var(--tt-checklist-border-active-color)
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span:before {
    opacity: 1
}

.tiptap.ProseMirror ul[data-type=taskList] li div {
    flex: 1 1;
    min-width: 0
}






.tiptap.ProseMirror>* {
    position: relative
}

.tiptap.ProseMirror {
    white-space: pre-wrap;
    outline: none;
    caret-color: var(--tt-cursor-color)
}

.tiptap.ProseMirror p:not(:first-child) {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
    margin-top: 20px
}

.tiptap.ProseMirror:not(.readonly):not(.ProseMirror-hideselection) ::selection {
    background-color: var(--tt-selection-color)
}

.tiptap.ProseMirror:not(.readonly):not(.ProseMirror-hideselection) .selection::selection {
    background: rgba(0,0,0,0)
}

.tiptap.ProseMirror .selection {
    display: inline;
    background-color: var(--tt-selection-color)
}

.tiptap.ProseMirror .ProseMirror-selectednode:not(img):not(pre):not(.react-renderer) {
    border-radius: var(--tt-radius-md);
    background-color: var(--tt-selection-color)
}

.tiptap.ProseMirror .ProseMirror-hideselection {
    caret-color: rgba(0,0,0,0)
}

.tiptap.ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize
}

.tiptap.ProseMirror a span {
    text-decoration: underline
}

.tiptap.ProseMirror s span {
    text-decoration: line-through
}

.tiptap.ProseMirror u span {
    text-decoration: underline
}

.tiptap.ProseMirror .tiptap-ai-insertion {
    color: var(--tiptap-ai-insertion-color)
}

.tiptap.ProseMirror .collaboration-carets__caret {
    border-right: 1px solid rgba(0,0,0,0);
    border-left: 1px solid rgba(0,0,0,0);
    pointer-events: none;
    margin-left: -1px;
    margin-right: -1px;
    position: relative;
    word-break: normal
}

.tiptap.ProseMirror .collaboration-carets__label {
    color: var(--tt-collaboration-carets-label);
    border-radius: .25rem;
    border-bottom-left-radius: 0;
    font-size: .75rem;
    font-weight: 600;
    left: -1px;
    line-height: 1;
    padding: .125rem .375rem;
    position: absolute;
    top: -1.3em;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    white-space: nowrap
}

.tiptap.ProseMirror [data-type=emoji] img {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    cursor: text
}

.tiptap.ProseMirror a {
    color: var(--link-text-color);
    text-decoration: underline
}

.tiptap.ProseMirror [data-type=mention] {
    display: inline-block;
    color: var(--tt-brand-color-500)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline {
    transition: color .2s ease-in-out,background-color .2s ease-in-out;
    color: var(--thread-text);
    border-bottom: 2px dashed var(--tt-color-yellow-base);
    font-weight: 600
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline.tiptap-thread--hovered,.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline.tiptap-thread--selected {
    background-color: var(--thread-bg-color);
    border-bottom-color: rgba(0,0,0,0)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img) {
    outline: .125rem solid var(--tt-color-yellow-base);
    border-radius: var(--tt-radius-xs,.25rem);
    overflow: hidden;
    width: -moz-fit-content;
    width: fit-content
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img).tiptap-thread--selected {
    outline-width: .25rem;
    outline-color: var(--tt-color-yellow-base)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img).tiptap-thread--hovered {
    outline-width: .25rem
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)) {
    border-radius: .25rem;
    border-bottom: .125rem dashed var(--tt-color-yellow-base);
    padding-bottom: .5rem;
    outline: .25rem solid rgba(0,0,0,0)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)).tiptap-thread--hovered,.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)).tiptap-thread--selected {
    background-color: var(--tt-color-yellow-base);
    outline-color: var(--tt-color-yellow-base)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--resolved.tiptap-thread--inline.tiptap-thread--selected {
    background-color: var(--tt-color-yellow-base);
    border-color: rgba(0,0,0,0);
    opacity: .5
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--block:has(.react-renderer) {
    margin-top: 3rem;
    margin-bottom: 3rem
}

.is-empty:not(.with-slash)[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    content: attr(data-placeholder)
}

.is-empty.with-slash[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    content: "Write, type '/' for commands…";
    font-style: italic
}

.is-empty[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    pointer-events: none;
    height: 0;
    position: absolute;
    width: 100%;
    text-align: inherit;
    left: 0;
    right: 0
}

.is-empty[data-placeholder]:has(>.ProseMirror-trailingBreak):before {
    color: var(--placeholder-color)
}

.prosemirror-dropcursor-block,.prosemirror-dropcursor-inline {
    background: var(--tt-brand-color-400)!important;
    border-radius: .25rem;
    margin-left: -1px;
    margin-right: -1px;
    width: 100%;
    height: .188rem;
    cursor: -webkit-grabbing;
    cursor: grabbing
}
</style>
