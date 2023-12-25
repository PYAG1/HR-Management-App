import { Fragment, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CustomizedeModal {
  renderButton: (setOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  renderTitle: () => ReactNode;
  renderBody: () => ReactNode;
  renderSubTitle?: () => ReactNode;
}

export default function CustomizedeModal({
  renderButton,
  renderTitle,
  renderBody,
  renderSubTitle,
}: CustomizedeModal) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {renderButton(setOpen)}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          {/* ... rest of your component */}
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full xl:w-8/12 h-[80vh] overflow-y-auto">
            <div>
              <div className=" ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 flex justify-between items-center w-full text-gray-900"
                >
                  {renderTitle()}
                </Dialog.Title>
                </div>
                {renderSubTitle && renderSubTitle()} 
                {renderBody()}
             
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>
    </>
  );
}
