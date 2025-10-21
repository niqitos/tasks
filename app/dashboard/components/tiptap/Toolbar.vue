<template>
  <UFieldGroup
    v-if="editor"
    class="sm:mx-auto flex-wrap gap-1.5"
  >
    <UButton
      v-for="(action, index) in textActions"
      :key="`tiptap-action-${index}`"
      size="md"
      color="neutral"
      :variant="action.active() ? 'subtle' : 'outline'"
      :icon="action.icon"
      :title="action.label"
      :disabled="action.disabled"
      :ui="{
        base: '!rounded-lg'
      }"
      @click="action.command()"
    />
  </UFieldGroup>
</template>

<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'

interface TextAction {
  name: string | object
  label: string
  icon: string
  command: () => void,
  disabled: boolean
  active: boolean
}

const props = defineProps({
  editor: {
    default: null,
    type: Object as PropType<Editor>,
  },
  content: {
    type: String,
    required: false,
    default: ''
  },
})

const textActions: TextAction[] = [
  {
    name: 'bold',
    label: 'Bold',
    icon: 'material-symbols-light:format-bold',
    command: () => props.editor?.chain().focus().toggleBold().run(),
    disabled: false,
    active: () => props.editor?.isActive('bold')
  },
  {
    name: 'italic',
    label: 'Italic',
    icon: 'material-symbols-light:format-italic',
    command: () => props.editor?.chain().focus().toggleItalic().run(),
    disabled: false,
    active: () => props.editor?.isActive('italic')
  },
  {
    name: 'underline',
    label: 'Underline',
    icon: 'material-symbols-light:format-underlined',
    command: () => props.editor?.chain().focus().toggleUnderline().run(),
    disabled: false,
    active: () => props.editor?.isActive('underline')
  },
  {
    name: 'strike',
    label: 'Strikethrough',
    icon: 'material-symbols-light:format-strikethrough',
    command: () => props.editor?.chain().focus().toggleStrike().run(),
    disabled: false,
    active: () => props.editor?.isActive('strike')
  },
  {
    name: 'codeblock',
    label: 'Code Block',
    icon: 'material-symbols-light:code-blocks-outline-rounded',
    command: () => props.editor?.chain().focus().toggleCodeBlock().run(),
    disabled: false,
    active: () => props.editor?.isActive('material-symbols-light:code-blocks-outline-rounded')
  },
  {
    name: 'code',
    label: 'Code',
    icon: 'material-symbols-light:code',
    command: () => props.editor?.chain().focus().toggleCode().run(),
    disabled: false,
    active: () => props.editor?.isActive('code')
  },
  {
    name: 'link',
    label: 'Link',
    icon: 'material-symbols-light:link',
    command: () => setLink(),
    disabled: false,
    active: () => props.editor?.isActive('link')
  },
  {
    name: 'blockquote',
    label: 'Blockquote',
    icon: 'material-symbols-light:format-quote',
    command: () => props.editor?.chain().focus().toggleBlockquote().run(),
    disabled: false,
    active: () => props.editor?.isActive('blockquote')
  },
  // {
  //   name: 'text_align_left,
  //   label: 'Align Left',
  //   icon: 'material-symbols-light:format-align-left',
  //   command: () => props.editor?.chain().focus().setTextAlign('left').run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive()
  // },
  // {
  //   name: 'text_align_center,
  //   label: 'Center',
  //   icon: 'material-symbols-light:format-align-center',
  //   command: () => props.editor?.chain().focus().setTextAlign('center').run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive()
  // },
  // {
  //   name: 'text_align_right,
  //   label: 'Align Right',
  //   icon: 'material-symbols-light:format-align-right',
  //   command: () => props.editor?.chain().focus().setTextAlign('right').run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive()
  // },
  // {
  //   name: 'text_align_justify,
  //   label: 'Justify',
  //   icon: 'material-symbols-light:format-align-justify',
  //   command: () => props.editor?.chain().focus().setTextAlign('justify').run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive({ textAlign: 'justify' })
  // },
  {
    name: 'taskList',
    label: 'Task List',
    icon: 'material-symbols-light:checklist',
    command: () => props.editor?.chain().focus().toggleTaskList().run(),
    disabled: false,
    active: () => props.editor?.isActive('taskList')
  },
  {
    name: 'bulletList',
    label: 'Bullet List',
    icon: 'material-symbols-light:format-list-bulleted',
    command: () => props.editor?.chain().focus().toggleBulletList().run(),
    disabled: false,
    active: () => props.editor?.isActive('bulletList')
  },
  {
    name: 'orderedList',
    label: 'Ordered List',
    icon: 'material-symbols-light:format-list-numbered',
    command: () => props.editor?.chain().focus().toggleOrderedList().run(),
    disabled: false,
    active: () => props.editor?.isActive('orderedList')
  },
  {
    name: 'heading_1',
    label: 'Heading 1',
    icon: 'material-symbols-light:format-h1',
    command: () => props.editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    disabled: false,
    active: () => props.editor?.isActive('heading', { level: 1 })
  },
  {
    name: 'heading_2',
    label: 'Heading 2',
    icon: 'material-symbols-light:format-h2',
    command: () => props.editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    disabled: false,
    active: () => props.editor?.isActive('heading', { level: 2 })
  },
  // {
  //   name: 'insert_table',
  //   label: 'Insert table',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive(insert_table')
  // },
  // {
  //   name: 'insert_html_table',
  //   label: 'Insert HTML table',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().insertContent(props.content, { parseOptions: { preserveWhitespace: false }}).run(),
  //   disabled: false,
  //   active: () => props.editor?.isActive('insert_html_table')
  // },
  // {
  //   name: 'add_column_before',
  //   label: 'Add column before',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().addColumnBefore().run(),
  //   disabled: !props.editor?.can().addColumnBefore(),
  //   active: () => props.editor?.isActive('add_column_before')
  // },
  // {
  //   name: 'add_column_after',
  //   label: 'Add column after',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().addColumnAfter().run(),
  //   disabled: !props.editor?.can().addColumnAfter(),
  //   active: () => props.editor?.isActive('add_column_after')
  // },
  // {
  //   name: 'delete_column',
  //   label: 'Delete column',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().deleteColumn().run(),
  //   disabled: !props.editor?.can().deleteColumn(),
  //   active: () => props.editor?.isActive('delete_column')
  // },
  // {
  //   name: 'add_row_before',
  //   label: 'Add row before',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().addRowBefore().run(),
  //   disabled: !props.editor?.can().addRowBefore(),
  //   active: () => props.editor?.isActive('add_row_before')
  // },
  // {
  //   name: 'add_row_after',
  //   label: 'Add row after',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().addRowAfter().run(),
  //   disabled: !props.editor?.can().addRowAfter(),
  //   active: () => props.editor?.isActive('add_row_after')
  // },
  // {
  //   name: 'delete_row',
  //   label: 'Delete row',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().deleteRow().run(),
  //   disabled: !props.editor?.can().deleteRow(),
  //   active: () => props.editor?.isActive('delete_row')
  // },
  // {
  //   name: 'delete_table',
  //   label: 'Delete table',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().deleteTable().run(),
  //   disabled: !props.editor?.can().deleteTable(),
  //   active: () => props.editor?.isActive('delete_table')
  // },
  // {
  //   name: 'merge_cells',
  //   label: 'Merge cells',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().mergeCells().run(),
  //   disabled: !props.editor?.can().mergeCells(),
  //   active: () => props.editor?.isActive('merge_cells')
  // },
  // {
  //   name: 'split_cell',
  //   label: 'Split cell',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().splitCell().run(),
  //   disabled: !props.editor?.can().splitCell(),
  //   active: () => props.editor?.isActive('split_cell')
  // },
  // {
  //   name: 'toggle_header_column',
  //   label: 'Toggle header column',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().toggleHeaderColumn().run(),
  //   disabled: !props.editor?.can().toggleHeaderColumn(),
  //   active: () => props.editor?.isActive('toggle_header_column')
  // },
  // {
  //   name: 'toggle_header_row',
  //   label: 'Toggle header row',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().toggleHeaderRow().run(),
  //   disabled: !props.editor?.can().toggleHeaderRow(),
  //   active: () => props.editor?.isActive('toggle_header_row')
  // },
  // {
  //   name: 'toggle_header_cell',
  //   label: 'Toggle header cell',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().toggleHeaderCell().run(),
  //   disabled: !props.editor?.can().toggleHeaderCell(),
  //   active: () => props.editor?.isActive('toggle_header_cell')
  // },
  // {
  //   name: 'merge_or_split',
  //   label: 'Merge or split',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().mergeOrSplit().run(),
  //   disabled: !props.editor?.can().mergeOrSplit(),
  //   active: () => props.editor?.isActive('merge_or_split')
  // },
  // {
  //   name: 'set_cell_attribute',
  //   label: 'Set cell attribute',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run(),
  //   disabled: !props.editor?.can().setCellAttribute('backgroundColor', '#FAF594'),
  //   active: () => props.editor?.isActive('set_cell_attribute')
  // },
  // {
  //   name: 'fix_tables',
  //   label: 'Fix tables',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().fixTables().run(),
  //   disabled: !props.editor?.can().fixTables(),
  //   active: () => props.editor?.isActive('fix_tables')
  // },
  // {
  //   name: 'go_to_next_cell',
  //   label: 'Go to next cell',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().goToNextCell().run(),
  //   disabled: !props.editor?.can().goToNextCell(),
  //   active: () => props.editor?.isActive('go_to_next_cell')
  // },
  // {
  //   name: 'go_to_previous_cell',
  //   label: 'Go to previous cell',
  //   icon: 'material-symbols-light:table',
  //   command: () => props.editor?.chain().focus().goToPreviousCell().run(),
  //   disabled: !props.editor?.can().goToPreviousCell(),
  //   active: () => props.editor?.isActive(go_to_previous_cell')
  // },
  {
    name: 'clear_format',
    label: 'Clear Format',
    icon: 'material-symbols-light:format-clear',
    command: () => props.editor?.chain().focus().clearNodes().unsetAllMarks().run(),
    disabled: false,
    active: () => props.editor?.isActive('clear_format')
  }
]

const setLink = () => {
  const url = window.prompt('URL', props.editor?.getAttributes('link').href)

  if (url === null) {
    return
  }

  if (url === '') {
    return !props.editor?.chain().focus().extendMarkRange('link').unsetLink().run()
  }

  return !props.editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}
</script>
