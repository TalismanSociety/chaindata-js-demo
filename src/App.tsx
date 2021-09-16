import { useEffect, useState } from 'react';
import chaindata from '@talismn/chaindata-js'

const App = () => {
  const [selectedChain, setSelectedChain] = useState<any>()
  const [chains, setChains] = useState<any>({})
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [nativeToken, setNativeToken] = useState()
  const [tokenDecimals, setTokenDecimals] = useState()
  const [rpcs, setRpcs] = useState([])
  
  const fetchChains = async () => {
    const _chains = await chaindata.chains()
    setChains(_chains)
    setSelectedChain(Object.keys(_chains)[0])
  }

  const fetchSelected = async (id: string) => {
    // lets fetch a single chain
    const chain = await chaindata.chain(id)

    // set some UI values
    setImage(chain.asset?.logo)
    setName(chain.name)
    setDescription(chain.description)
    setNativeToken(chain.nativeToken)
    setTokenDecimals(chain.tokenDecimals)
    setRpcs(chain.rpcs)
  }

  useEffect(() => {
    fetchChains()
  }, [])

  useEffect(() => {
    !!selectedChain && fetchSelected(selectedChain)
  }, [selectedChain])

  return <div>
    <p>
      <select
        onChange={e => setSelectedChain(e.target.value)}
        >
        {
          Object.keys(chains).map((id: string) => 
            <option 
              key={id} 
              value={id}
              >
              {chains[id]} ({id})
            </option>
          )
        }
      </select>
    </p>
    <div>
      <img 
        src={image} 
        alt='logo' 
        style={{
          width: '4rem', 
          height: '4rem'
        }}
        />
      <fieldset>
        <legend>Basic info</legend>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
      </fieldset>
      <fieldset>
        <legend>Token info</legend>
        <p>Native Token: {nativeToken}</p>
        <p>Token Decimals: {tokenDecimals}</p>
      </fieldset>
      <fieldset>
        <legend>RPCs</legend>
        {rpcs.map(rpc => <p key={rpc}>{rpc}</p>)}
      </fieldset>
      
    </div>
  </div>
}

export default App;
