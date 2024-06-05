import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Fieldset, Field, Label, Textarea, Button } from '@headlessui/react';
import axios from 'axios';
import Marked from './Marked'

const PostCreationPage = () :ReactElement => {

  const navigate = useNavigate();
  const [title, setTitle]: [string, Function] = useState('');
  const [body, setBody]: [string, Function] = useState('');

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) :void => {
    let setStateFunc :Function
    if (e.target.name === 'Post Title') {
      setStateFunc = setTitle;
    }
    else if (e.target.name === 'Post Body') {
      setStateFunc = setBody;
    }
    else {
      return;
    }
    setStateFunc(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!title.length || !body.length) {return}
    const newPost:{title:string, body:string} = {title, body};
    axios.post('/api/posts', {newPost})
      .then(() :void => {
        navigate('/dashboard')
      })
  }

  return (
  <div className=' flex flex-row flex-grow ml-3 mt-3'>
    <h1>Create Post</h1>
    <div className='flex flex-col'>
      <h2>Title</h2>
      <Marked text={title} />
      <h2>Body</h2>
      <Marked text={body} />
    </div>
    <Fieldset className="flex flex-col">
      <Field className="justify-around flex-grow">
        <Label className="block font-bold"><h2>Title</h2></Label>
        <Input
          value={title}
          onChange={handleTextInput}
          name="Post Title"
          type="text"
          placeholder="Title"
           className="block border-solid border-2"
          />
      </Field>
      <Field>
        <Label className="block font-bold">Body</Label>
        <Textarea
          value={body}
          onChange={handleTextInput}
          name="Post Body"
          placeholder="Body Text"
           className="block border-solid border-2"
        />
      </Field>
      <Field>
        <Button onClick={handleSubmit} className="bg-lime-400 hover:bg-lime-700 rounded-md border-solid border-black border-2" >Submit</Button>
      </Field>
    </Fieldset>
  </div>
  )
}

export default PostCreationPage;