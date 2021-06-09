import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import {createScene, getScenes} from '../../services/apiCall'
const actOneObj = {
  name: '',
  location: '',
  characters: '',
  description: '',
  act: 'act one',
  scriptType: 'stage play',
}
const actTwoObj = {
  name: '',
  location: '',
  characters: '',
  description: '',
  act: 'act two',
  scriptType: 'stage play',
}
export default function STGNewScene() {
  const [actOne, setActOne] = useState(actOneObj)
  const [actTwo, setActTwo] = useState(actTwoObj)
  const [scenes, setScenes] = useState([])
  const handleChangeOne = (e) => {
    const { name, value } = e.target

    setActOne((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleChangeTwo = (e) => {
    const { name, value } = e.target
    setActTwo((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmitOne = async (e) => {
    e.preventDefault()
    const res = await createScene(actOne) 
  }
  const handleSubmitTwo = async (e) => {
    e.preventDefault()
    const res = await createScene(actTwo)
    fetchData()
  }
  const fetchData = async () => {
    const res = await getScenes()
    setScenes(res.records.filter(scene => scene.fields.scriptType === 'stage play'));
  };
  useEffect(() => {
    fetchData()
  }, [])
  console.log(scenes)
  const actOneArr = scenes.filter(scene => scene.fields.act === 'act one')
  const actTwoArr = scenes.filter(scene => scene.fields.act === 'act two')
  return (
    <div>
      <header>
        <h1>Stage Play</h1>
        <nav>
          <Link to='/stageplay'>Story Board</Link>
          <Link to='/stageplay/character'>Character List</Link>
        </nav>
      </header>
      <h2>Act One</h2>
      <form onChange={handleChangeOne} onSubmit={handleSubmitOne}>
        <label>Scene Name:</label>
        <input name='name'/>
        <br />
        <label>Location:</label>
        <input name='location'/>
        <br/>
        <label>Character(s):</label>
        <input name='characters'/>
        <br/>
        <label>Description:</label>
        <input name='description'/>
        <br/>
        <button>Add Scene</button>
      </form>
      <ul>
        {actOneArr.map(scene => {
          return <li>{scene.fields.name}{scene.fields.location}</li>
        })}
      </ul>
      <h2>Act Two</h2>
      <form onChange={handleChangeTwo} onSubmit={handleSubmitTwo}>
        <label>Scene Name:</label>
        <input name='name'/>
        <br />
        <label>Location :</label>
        <input name='location'/>
        <br/>
        <label>Character(s):</label>
        <input name='characters'/>
        <br/>
        <label>Description:</label>
        <input name='description'/>
        <br/>
        <button>Add Scene</button>
      </form>
      <ul>
        {actTwoArr.map(scene => {
          return <li>{scene.fields.name}{scene.fields.location}</li>
        })}
      </ul>
    </div>
  )
}
