import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import EditThisPage from '@theme/EditThisPage';
import clsx from 'clsx';
import React from 'react';

import DocsRating from '../../../core/DocsRating';

function TagsRow(props) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterTagsRow, 'row margin-bottom--sm')}></div>
  );
}
function EditMetaRow({ editUrl }) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      <div className="col">
        <DocsRating />
      </div>
    </div>
  );
}
export default function DocItemFooter() {
  const { metadata } = useDoc();
  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy, tags } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!editUrl;
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }

  return (
    <>
      <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
          {canDisplayTagsRow && <TagsRow tags={tags} />}
          {canDisplayEditMetaRow && <EditMetaRow editUrl={editUrl} />}
        </footer>
      </div>
    </>
  );
}
