import React from 'react';
import Button from '../../Button';

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  return (
    <div className="bg-dark-layer-1 absolute bottom-0 z-10 flex w-full">
      <div className="mx-5 my-[10px] flex w-full justify-between">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          {/* TODO this button doesnt do anything right now */}
          <button className="hover:bg-bg-active text-dark-label-2 inline-flex items-center rounded-lg px-3 py-1.5 pr-2 pl-3 text-sm font-medium transition-all">
            Console
            <div className="ml-1 flex transform items-center transition">
              {/* <BsChevronUp className="fill-gray-6 fill-dark-gray-6 mx-1" /> */}
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button className="h-10" variant="primary" onClick={handleSubmit}>
            Run
          </Button>

          <Button className="h-10" variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
