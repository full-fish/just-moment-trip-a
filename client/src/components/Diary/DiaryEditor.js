import React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFishFins } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import nyanparrot from '../../Assets/nyanparrot.gif';
import duckzzal from '../../Assets/duckzzal.gif';
import gumiparrot from '../../Assets/gumiparrot.gif';
import partyannoyedbird from '../../Assets/partyannoyedbird.gif';
import vibepartycat from '../../Assets/vibepartycat.gif';

const fuzzy = require('./fuzzy');

const Slide = keyframes`
  0% {    
    transform: scaleX(-1);
    left: calc(30px);
  }
  49.99% {
    transform: scaleX(-1);
    left: 0%;
  }
  50% {
    transform: scaleX(1);
    left: 0%;
  }
  99.99% {
    transform: scaleX(1);
    left: calc(30px);
  }
  100% {
    transform: scaleX(-1);
    left: calc(30px);
  }
`;

const ManFishIcon = styled.div`
  width: 26.2vw;
  position: relative;
  animation-name: ${Slide};
  animation-duration: 6s;
  animation-iteration-count: infinite;
`;

const ManFishArea = styled.div`
  width: 100%;
  height: 30px;
`;

const faFishFinsIcon = (
  <ManFishArea>
    <ManFishIcon>
      <FontAwesomeIcon icon={faFishFins} />
    </ManFishIcon>
  </ManFishArea>
);

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 48px;
  width: 98%;
  border: none;
  border-radius: 6px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 0.8em;
      list-style: none;
      border-radius: 6px;
      margin: 2px 2px;
      background: rgb(70, 125, 196);
      :hover {
        cursor: pointer;
        transition: all 0.5s linear;
        transform: scale(1.1);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: red;
        border-radius: 50%;
        background: #efefef;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border-radius: none;
    text-align: center;
    background-color: transparent;
    border: none;
    height: 3vh;
    width: 20vw;
    font-size: 0.8em;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }
`;

const DiaryEditorBox = styled.div`
  //! ?????? ?????????
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28.5vw;
  margin: 10px;
  padding: 10px 0;
  border-radius: 20px;
  border: 2.5px solid rgb(109, 180, 232);
  :hover {
    box-shadow: 0px 5px 10px 5px rgba(130, 141, 171, 0.3);
  }
`;

const InfoBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  height: 25vh;
`;

const DiaryEditInputBox = styled.input`
  font-size: 0.8em;
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 15px;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.08);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const DiaryEditTextareaBox = styled.textarea`
  text-align: center;
  align-items: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border: none;
  resize: none;
  padding: 50px;
  width: 23.5vw;
  height: 8vw;
  font-size: 0.8em;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.08);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const DiaryBtn = styled.button`
  background-color: transparent;
  outline: none;
  font-family: SsurroundFont;
  border: none;
  font-size: 0.5em;
  :hover {
    cursor: pointer;
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function DiaryEditor({
  onRemove,
  onEdit,
  toggleClicked,
  id,
  title,
  content,
  write_date,
  hashtags,
  search,
  searchType,
}) {
  const titleInput = useRef();
  const contentInput = useRef();
  useEffect(() => {
    console.log(`${id}??? ??????????????? ??????`);
    if (searchType === 'title') {
      titleInput.current.innerHTML = titleInput.current.innerHTML
        .replace(/<span style="color: red">/g, '')
        .replace(/<\/span>/g, '');
      titleInput.current.innerHTML = fuzzy.chageRed(
        titleInput.current.innerHTML,
        search,
      );
    }
    if (searchType === 'content') {
      contentInput.current.innerHTML = contentInput.current.innerHTML
        .replace(/<span style="color: red">/g, '')
        .replace(/<\/span>/g, '');
      contentInput.current.innerHTML = fuzzy.chageRed(
        contentInput.current.innerHTML,
        search,
      );
    }
  }, [search]);

  const localContentInput = useRef();
  const lacalTitleInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [localTitle, setLocalTitle] = useState(title);
  const [localHashtags, setLocalHashtags] = useState(hashtags);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleClickRemove = () => {
    Swal.fire({
      title: `????????? ????????????????`,
      text: '????????????? ????????? ????????? ????????? ??? ?????????',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '???',
      cancelButtonText: '?????????',
      backdrop: `
      rgba(0,0,110,0.5)
      url(${nyanparrot})
      left bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '?????? ??????!',
          text: `???????????? ????????? ???????????????`,
          confirmButtonText: '????????????',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${duckzzal})
          left bottom
          no-repeat
        `,
        });

        onRemove(id);
      }
    });
  };

  function handleOnInput(el, maxlength) {
    if (el.value.length > maxlength) {
      el.value = el.value.substr(0, maxlength);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
    setLocalHashtags(hashtags);
  };

  const handleEdit = () => {
    if (localTitle.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    Swal.fire({
      title: `????????? ????????????????`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '???',
      cancelButtonText: '?????????',
      backdrop: `
      rgba(0,0,110,0.5)
      url(${gumiparrot})
      right bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '?????? ??????!',
          text: `???????????? ????????? ???????????????`,
          confirmButtonText: '????????????',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${partyannoyedbird})
          right bottom
          no-repeat
        `,
        });
        onEdit(id, localContent, localTitle, localHashtags);
        toggleIsEdit();
        // console.log(
        //   '------------- ????????? localHashtags??? ????????? ????????? ? :',
        //   localHashtags,
        // );
        // console.log('------------- ????????? id??? ????????? ????????? ? :', hashtags);
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          text: `????????? ???????????????`,
          confirmButtonText: '????????????',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${vibepartycat})
          top
          no-repeat
        `,
        });
        handleQuitEdit();
      }
    });
  };

  const addTags = event => {
    const filtered = localHashtags.filter(el => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setLocalHashtags([...localHashtags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTags = indexToRemove => {
    setLocalHashtags(
      localHashtags.filter((_, index) => index !== indexToRemove),
    );
  };

  /*<--------------------------------------------------------------------------------------------------------------------->*/

  function handleHashtags(event) {
    // onFilter(selectedHashtag);
    // console.log(
    //   '------------- ????????? localHashtags??? ????????? ????????? ? :',
    //   localHashtags,
    // );
    toggleClicked(event);
  }

  /*<--------------------------------------------------------------------------------------------------------------------->*/
  return (
    <DiaryEditorBox
      data-aos="fade-up"
      data-aos-offset="-400"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="firse"
      data-aos-anchor-placement="top-center"
    >
      <div>
        {isEdit ? (
          <>
            <div className="title_edit">
              <DiaryEditInputBox
                className="title_info"
                ref={lacalTitleInput}
                value={localTitle}
                onChange={e => setLocalTitle(e.target.value)}
              />
            </div>
            <div className="content_edit">
              <DiaryEditTextareaBox
                ref={localContentInput}
                value={localContent}
                maxlength="100"
                onChange={e => setLocalContent(e.target.value)}
              />
            </div>
            <TagsInput>
              <ul
                id="tags"
                style={{ justifyContent: 'center', textAlign: 'center' }}
              >
                {localHashtags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTags(index)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
              <input
                className="tag-input"
                type="text"
                onKeyUp={event =>
                  event.key === 'Enter' ? addTags(event) : null
                }
                maxlength="12"
                placeholder="?????? 12?????? ?????? ??? ??? ????????? ????"
              />
            </TagsInput>
          </>
        ) : (
          <>
            {faFishFinsIcon}
            <InfoBox>
              <div className="title" ref={titleInput}>
                <span className="date">{String(write_date).slice(0, 16)}</span>
                <div style={{ padding: '5px 0 0 0' }}>
                  <span>{title}</span>
                </div>
              </div>
              <div
                className="content"
                style={{ width: '28.5vw', padding: '% 0' }}
                ref={contentInput}
              >
                {content}
              </div>
              <div className="hashtags" style={{ width: '28.5vw' }}>
                {localHashtags.length === 0 ? (
                  <TagsInput display="none" />
                ) : (
                  <TagsInput display="flex">
                    <ul id="tags">
                      {localHashtags.map((tag, index) => (
                        <li key={index} className="tag">
                          <span
                            className="tag-title"
                            onClick={event => {
                              console.log(
                                '----------- ???????????? ????????? localHashtag??? ????????? ????????? ?',
                                event.target.innerText,
                              );
                              handleHashtags(event);
                            }}
                          >
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </TagsInput>
                )}
              </div>
            </InfoBox>
          </>
        )}

        <br />
      </div>

      {isEdit ? (
        <>
          <div>
            <DiaryBtn onClick={handleQuitEdit}>?????? ??????</DiaryBtn>
            <DiaryBtn onClick={handleEdit}>?????? ??????</DiaryBtn>
          </div>
        </>
      ) : (
        <>
          <div>
            <DiaryBtn onClick={handleClickRemove}>????????????</DiaryBtn>
            <DiaryBtn onClick={toggleIsEdit}>????????????</DiaryBtn>
          </div>
        </>
      )}
    </DiaryEditorBox>
  );
}

export default memo(DiaryEditor);
