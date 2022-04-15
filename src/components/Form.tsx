import { ToDoCategory, todoCategoryState, toDoState } from 'atoms';
import { useForm } from 'react-hook-form';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

// textarea 높이 조절
function textareaResize(event: React.KeyboardEvent<HTMLTextAreaElement>) {
  const { currentTarget } = event;

  currentTarget.style.height = 'auto';
  currentTarget.style.height = 12 + currentTarget.scrollHeight + 'px';
}

const FormElement = styled.form`
  width: 100%;
  background: var(--box-color);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--font-color);
  margin-bottom: 2em;
  textarea {
    width: 100%;
    height: 92px;
    background: transparent;
    border: none;
    resize: none;
    outline: none;
    padding: 1em;
    color: var(--font-color);
    font-size: 1rem;
    line-height: 1.5;
    overflow: hidden;
  }
  .util {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1em;
    /* justify-content: space-between; */
    select {
      font-size: 1rem;
      padding: 0.5em;
      background: transparent;
      border: none;
      color: var(--font-color);
      outline: none;
      cursor: pointer;
      text-align: center;
    }
    button[type='submit'] {
      font-size: 1rem;
      padding: 0.5em;
      background: transparent;
      border: none;
      color: var(--font-color);
      outline: none;
      cursor: pointer;
      background: var(--bg-color);
      border-top-left-radius: 10px;
      font-weight: 700;
    }
  }
`;

interface IForm {
  toDo: string;
}

const Form = () => {
  const [toDoCategory, setToDoCategory] = useRecoilState(todoCategoryState);
  const [toDo, setToDo] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    setToDo((oldObj) => {
      const copyArr = [...oldObj[toDoCategory]];
      copyArr.unshift({
        id: Date.now(),
        toDo: data.toDo,
      });

      return {
        ...oldObj,
        [toDoCategory]: copyArr,
      };
    });

    setValue('toDo', '');
  };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setToDoCategory(value as ToDoCategory);
  };

  return (
    <FormElement onSubmit={handleSubmit(onSubmit)}>
      <textarea
        onKeyUp={textareaResize}
        {...register('toDo', {
          required: '할일을 적어주세요!',
        })}
      ></textarea>
      <div className="util">
        <select value={toDoCategory} onInput={onInput}>
          <option value={ToDoCategory.TO_DO} key={ToDoCategory.TO_DO}>
            준비
          </option>
          <option value={ToDoCategory.DOING} key={ToDoCategory.DOING}>
            진행
          </option>
          <option value={ToDoCategory.DONE} key={ToDoCategory.DONE}>
            종료
          </option>
        </select>
        <button type="submit">등록</button>
      </div>
    </FormElement>
  );
};

export default Form;
