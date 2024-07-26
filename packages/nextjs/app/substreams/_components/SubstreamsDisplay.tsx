import { Address } from "~~/components/scaffold-eth";
import getSubstreamsData from "~~/utils/scaffold-eth/getSubstreamsData";

const SubstreamsDisplay = async () => {
  const token =
    "eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTc3NzAzOTgsImp0aSI6Ijk2MzE2NjRkLWU0MWItNDBmZC05OWE1LTJkZDFiZDAxNzBlMCIsImlhdCI6MTcyMTc3MDM5OCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiIwdG9qeTg4MzE1NDQwMzRjNTAzNmQiLCJ2IjoxLCJha2kiOiI3MDFlNWI5ZWZjYjk2MDY3M2FmNTU3YWUwZDdiMWEzZjA0OTVkNTE0ZmExNWQyZTg4YWZkZWYxYjkyM2M4Zjg0IiwidWlkIjoiMHRvank4ODMxNTQ0MDM0YzUwMzZkIn0.tERT2pPhDDEbqG_OAJAme4HJQgl4lSjGTRx-_I7RPDUboX1cAmshNXhTZFcYpsJ0t_eEKLL22PhmL6RLLVK7Mg";
  //   const module = "map_deposits";
  const module = "map_pools_created";
  const substreamsData = await getSubstreamsData(token, module);
  console.log("data from .tsx component:", substreamsData);

  return (
    // <div className="space-y-4">
    //   <div className="p-4 bg-accent rounded shadow grid grid-cols-4 gap-8">
    //     <div className="font-bold text-xl">Name</div>
    //     <div className="font-bold text-xl">Symbol</div>
    //     <div className="font-bold text-xl">Address</div>
    //   </div>
    //   {substreamsData.transfers.map((transfer: any) => (
    //     <div
    //       key={`${transfer.address} + ${transfer.symbol}`}
    //       className="p-4 bg-accent rounded shadow grid grid-cols-4 gap-8"
    //     >
    //       <p>{transfer.name}</p>
    //       {/* <p>{transfer.symbol}</p> */}
    //       <p>
    //         {/* <Address address={`0x${transfer.address}`} /> */}
    //         {transfer.address}
    //       </p>
    //     </div>
    //   ))}
    // </div>
    // <div>
    //   {substreamsData.deposits.map((deposit: any) => (
    //     <div key={`${deposit.to} + ${deposit.from}`}>
    //       <p>to: {deposit.to}</p>
    //       <p>from: {deposit.from}</p>
    //       <p>tx-value: {deposit.tx_value}</p>
    //     </div>
    //   ))}
    <div>
      {substreamsData.pools.map((pool: any) => (
        <div key={`${pool.to}`}>
          <p>address: {pool.address}</p>
          <p>time: {pool.created_at_timestamp}</p>
          <p>block: {pool.created_at_blocknumber}</p>
          <p>token 0: {pool.token0.name}</p>
          <p>token 1: {pool.token1.name}</p>
          <p>token 0 symbol: {pool.token0.symbol}</p>
          <p>token 1 symbol: {pool.token1.symbol}</p>
          <p>fee: {pool.fee_tier}</p>
        </div>
      ))}
      {/* // <div>data: {substreamsData.pools[0].address}</div> */}
    </div>
    // <div>hell</div>
  );
};

export default SubstreamsDisplay;
