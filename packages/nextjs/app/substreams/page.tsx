import SubstreamsDisplay from "./_components/SubstreamsDisplay";
import { NextPage } from "next";

const Substreams: NextPage = () => {
  return (
    <>
      <div>
        <div className="flex items-center flex-col flex-grow pt-10">Hello from Substreams</div>
        <SubstreamsDisplay />
      </div>
    </>
  );
};

export default Substreams;
