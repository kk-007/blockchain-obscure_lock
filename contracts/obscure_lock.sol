pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract obscure_lock {
 uint i=0;
 struct Data
   {
       uint id;
       string locker_id;
       string user_id;
       string status;
       string weight;
       string timestemp;
   }
   Data[] datas;
 function set(string memory _locker_id,string memory _user_id,string memory _status,string memory _weight,string memory _timestemp) public {
   datas.push(Data(i,_locker_id,_user_id,_status,_weight,_timestemp));
   i++;
 }

 function get() public view returns(Data[] memory) {
     return datas;
 }
}