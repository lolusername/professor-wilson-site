import { StructureBuilder } from 'sanity/structure'
import { UserIcon, SearchIcon, DocumentIcon, EditIcon, StarIcon, BookIcon, TagIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Professor Profile - Singleton
      S.listItem()
        .title('Professor Profile')
        .id('professor-profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('professor')
            .documentId('professor-profile')
            .title('Professor Profile')
        ),

      S.divider(),

      // Academic Content
      S.listItem()
        .title('Academic Content')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('Academic Content')
            .items([
              S.listItem()
                .title('Research Projects')
                .icon(SearchIcon)
                .child(S.documentTypeList('research').title('Research Projects')),
              
              S.listItem()
                .title('Publications')
                .icon(DocumentIcon)
                .child(S.documentTypeList('publication').title('Publications')),
              
              S.listItem()
                .title('CV Entries')
                .icon(StarIcon)
                .child(S.documentTypeList('cvEntry').title('CV Entries')),
              
              S.listItem()
                .title('Courses')
                .icon(BookIcon)
                .child(S.documentTypeList('course').title('Courses')),
            ])
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog Posts')
        .icon(EditIcon)
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      S.divider(),

      // Taxonomy
      S.listItem()
        .title('Research Areas')
        .icon(TagIcon)
        .child(S.documentTypeList('researchArea').title('Research Areas')),

      // Filter out ALL organized document types to prevent duplication
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'professor',
          'research', 
          'publication', 
          'cvEntry', 
          'course', 
          'blogPost', 
          'researchArea'
        ].includes(listItem.getId() || '')
      ),
    ]) 