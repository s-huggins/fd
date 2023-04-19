import { gql, useMutation } from '@apollo/client';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';
import { Button } from '../../components/common/elements/button';
import { FDIcon } from '../../components/common/fd-icon';
import { Summary } from '../../components/summary';
import { useAppContext } from '../../context/app-context';
import { SaveSummaryMutation, SaveSummaryMutationVariables } from '../../gql/graphql';

const SAVE_SUMMARY_MUTATION = gql`
  mutation SaveSummary($saveSummaryInput: SaveSummaryInput!) {
    saveSummary(input: $saveSummaryInput) {
      id
      content
      tags
      createdAt
    }
  }
`;

const tooltipClasses = cva(
  [
    // defaults

    'p-4',
    'z-[1000000]',
    'w-[75vw]',
    'max-w-[600px]',
    // 'max-h-[400px]',
    'p-2',
    'overflow-y-auto',
    'text-base',
    'leading-7',
    'text-dark-text',
    'rounded-xl',
    'shadow-dark-inner'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-text'],

        light: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ]
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface ITooltipSummaryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipClasses> {}

export const TooltipSummary: FC<ITooltipSummaryProps> = ({ className, ...props }) => {
  const { loadedTooltipSummary: loadedSummary, saveLoadedSummary, highlightedText, theme } = useAppContext();

  const [saveSummary, { data: savedData, loading: saveLoading, error: saveError }] = useMutation<
    SaveSummaryMutation,
    SaveSummaryMutationVariables
  >(SAVE_SUMMARY_MUTATION, {
    onCompleted: () => saveLoadedSummary()
  });

  const handleSaveSummary = () => {
    saveSummary({
      variables: {
        saveSummaryInput: {
          content: loadedSummary.summary.content,
          tags: loadedSummary.summary.tags,
          highlightedText
        }
      }
    });
  };

  return (
    <div className={tooltipClasses({ theme, className })} {...props}>
      <div className="flex justify-end mb-1" style={{ marginTop: '-6px' }}>
        <FDIcon className="h-5 opacity-75" />
      </div>
      <Summary content={loadedSummary.summary.content} tags={loadedSummary.summary.tags} />
      <div className="h-9">
        {!loadedSummary.saved && (
          <Button disabled={saveLoading} onClick={handleSaveSummary}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};
