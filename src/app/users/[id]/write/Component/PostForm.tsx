'use client';

import { useState } from 'react';
import { handleSubmit } from '../serverAction';

const PostForm = ({ Author, userId }: { Author: string; userId: string }) => {
  const [state, setState] = useState<{
    Content: string;
    Score: number;
    isPrivate: boolean;
  }>({
    Content: '',
    Score: 0,
    isPrivate: false,
  });
  return (
    <form
      onSubmit={async () => await handleSubmit({ ...state, Author, userId })}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내용
        </label>
        <textarea
          value={state.Content}
          onChange={(e) =>
            setState((prev) => ({ ...prev, Content: e.target.value }))
          }
          rows={5}
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="게시글 내용을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          점수 (0~5)
        </label>
        <input
          type="number"
          min={0}
          max={5}
          value={state.Score}
          onChange={(e) =>
            setState((prev) => ({ ...prev, Score: Number(e.target.value) }))
          }
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
      >
        게시글 등록
      </button>
    </form>
  );
};

export default PostForm;
