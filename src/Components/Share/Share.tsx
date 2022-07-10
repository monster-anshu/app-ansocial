import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import {
  Bottom,
  Button,
  Container,
  Hr,
  Img,
  Input,
  LoaderDiv,
  Option,
  Options,
  OptionText,
  PreviewContainer,
  Top,
} from './style';
import { EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons';
import { Context } from 'Context';
import { Loader } from 'Components';
import { PostType } from 'Types';
import { toast, ToastContainer } from 'react-toastify';

interface Proptypes {
  onShare?: (newPost: PostType) => void;
}

const Share: React.FC<Proptypes> = ({ onShare }) => {
  const [text, setText] = useState('');
  const { fetchAxios } = useContext(Context);
  const [file, setFile] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length < 4) {
      toast.dismiss();
      toast.warn('Description should be at least 4 character ');
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append('description', text);
    if (file) {
      data.append('file', file);
    }
    fetchAxios({
      url: '/post',
      method: 'POST',
      data,
    })
      .then(({ data }) => {
        onShare?.(data.post);
        setFile(null);
        setText('');
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };
  const handelFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.item(0));
  };

  return (
    <Container onSubmit={handelSubmit}>
      <ToastContainer />
      {isLoading && (
        <LoaderDiv>
          <Loader />
        </LoaderDiv>
      )}
      <Top>
        <Img src={'/assets/person/3.jpeg'} />
        <Input
          placeholder={"What's in your Mind ? (at least 4 character)"}
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Top>
      <Hr />
      <Bottom>
        <Options>
          <Option htmlFor="file">
            <PermMedia htmlColor={'tomato'} />
            <Option>Photo or Video</Option>
            <input
              type={'file'}
              id={'file'}
              style={{ display: 'none' }}
              onChange={handelFile}
              multiple={false}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
          </Option>
          <Option>
            <Label htmlColor={'blue'} />
            <OptionText>Tag</OptionText>
          </Option>
          <Option>
            <Room htmlColor={'green'} />
            <OptionText>Location</OptionText>
          </Option>
          <Option>
            <EmojiEmotions htmlColor={'goldenrod'} />
            <OptionText>Feelings</OptionText>
          </Option>

          <Button type={'submit'}>Share</Button>
        </Options>
      </Bottom>
      {file && (
        <PreviewContainer>
          <img src={URL.createObjectURL(file)} />
          <i className="bx bxs-trash" onClick={() => setFile(null)}></i>
        </PreviewContainer>
      )}
    </Container>
  );
};

export default Share;
