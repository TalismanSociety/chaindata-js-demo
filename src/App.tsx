import { useEffect, useState } from 'react';
import chainspec from './chainspec'

const App = () => {
  const [selectedChain, setSelectedChain] = useState()
  const [chains, setChains] = useState({})
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [rpcs, setRpcs] = useState([])
  
  const fetchChains = async () => {
    const _chains = await chainspec.chains()
    setChains(_chains)
    setSelectedChain(Object.keys(_chains)[0])
  }

  const fetchSelected = async id => {
    // lets fetch a single chain
    const chain = await chainspec.chain(id)

    // set some UI values
    setImage(chain.asset?.logo)
    setName(chain.name)
    setDescription(chain.description)

    // fetch & set rpcs
    const rpcs = chain.rpcs
    setRpcs(rpcs)
  }

  useEffect(() => fetchChains(), [])

  useEffect(() => !!selectedChain && fetchSelected(selectedChain), [selectedChain])

  return <div>
    <p>
      <select
        onChange={e => setSelectedChain(e.target.value)}
        >
        {Object.keys(chains).map(id => <option value={id}>{chains[id]} ({id})</option>)}
      </select>
    </p>
    <div>
      <img src={image} alt='logo' style={{width: '4rem', height: '4rem'}}/>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      {rpcs.map(rpc => <p key={rpc}>{rpc}</p>)}
    </div>
  </div>
}

export default App;
