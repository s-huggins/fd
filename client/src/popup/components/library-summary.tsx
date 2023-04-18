import { gql, useMutation } from '@apollo/client';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { HorizontalRule } from '../../components/common/horizontal-rule';
import { Timestamp } from '../../components/common/timestamp';
import { Summary } from '../../components/summary';
import { useAppContext } from '../../context/app-context';
import { DeleteSummaryMutation, DeleteSummaryMutationVariables } from '../../gql/graphql';
import { SummaryHighlight } from './summary-highlight';

export interface ILibrarySummaryProps {
  id: string;
  content: string;
  tags: string[];
  createdAt: Date;
  highlightedText: string;
  onSummaryDeleted: () => void;
}

const DELETE_SUMMARY_MUTATION = gql`
  mutation DeleteSummary($deleteSummaryInput: DeleteSummaryInput!) {
    deleteSummary(input: $deleteSummaryInput)
  }
`;

export const LibrarySummary: FC<ILibrarySummaryProps> = ({
  id,
  content,
  tags,
  createdAt,
  highlightedText,
  onSummaryDeleted
}) => {
  const {
    libraryContext: { summaries, setSummaries }
  } = useAppContext();

  const [deleteSummary, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation<
    DeleteSummaryMutation,
    DeleteSummaryMutationVariables
  >(DELETE_SUMMARY_MUTATION, {
    onCompleted: () => onSummaryDeleted()
  });

  const handleDeleteSummary = () => {
    deleteSummary({ variables: { deleteSummaryInput: { id } } });
  };

  return (
    <div>
      <SummaryHighlight highlightedText={highlightedText} />
      <Summary content={content} tags={tags} />
      <div className="flex justify-end">
        <Timestamp timestamp={createdAt} />
      </div>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        size="lg"
        className="cursor-pointer"
        onClick={handleDeleteSummary}
        title="Delete summary"
      />
      <HorizontalRule />
    </div>
  );
};
