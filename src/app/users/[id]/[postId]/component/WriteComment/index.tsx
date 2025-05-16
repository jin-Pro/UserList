'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import c from 'src/util/c';
import { handlePostComment } from './serverAction';

const WriteComment = ({
  postId,
  writerId,
}: {
  writerId: string;
  postId: string;
}) => {
  const [state, setState] = useState('');
  const router = useRouter();

  return (
    <div
      className={c(
        'h-[140px]',
        'relative',
        'rounded-[8px] border-[0.5px] border-gray-300 shadow-stone-200',
      )}
    >
      <textarea
        onChange={(e) => setState(e.target.value)}
        className={c(
          'w-full h-[100px]',
          'focus:outline-none',
          'px-[8px] py-[12px]',
        )}
        placeholder="댓글을 작성하세요"
        value={state}
      />

      <button
        onClick={() =>
          handlePostComment({
            Content: state,
            PostId: Number(postId),
            Author: writerId,
            onSuccess: () => {
              setState('');
              router.refresh();
            },
          })
        }
        className={c(
          'w-[70px] h-[30px]',
          'rounded-[4px]',
          'bg-blue-500',
          'text-white',
          'absolute right-[8px] bottom-[5px]',
        )}
      >
        submit
      </button>
    </div>
  );
};

export default WriteComment;
