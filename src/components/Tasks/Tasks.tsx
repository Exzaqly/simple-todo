import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "../../redux/tasksReducer";
import { getSuitableTasks } from "../../redux/selectors";
import { Task } from "./Task";
import { Sorts } from "../Sorts/Sorts";
import {
  Dispatch,
  setFilterValue,
  setSortingValue,
  ShowFilterType,
  SortingType,
} from "../../redux/filterReducer";

export const Tasks: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const tasks = useSelector(getSuitableTasks);
  const sortingHandleChange = (value: SortingType) => {
    dispatch(setSortingValue(value));
  };
  const filterHandleChange = (value: ShowFilterType) => {
    dispatch(setFilterValue(value));
  };

  return (
    <div>
      <Sorts
        showHandleChange={filterHandleChange}
        sortingHandleChange={sortingHandleChange}
      />
      <div>
        {tasks.map((t: TaskType) => (
          <Task
            key={t.id}
            title={t.title}
            text={t.text}
            date={t.date}
            isComplete={t.isComplete}
            isImportant={t.isImportant}
            id={t.id}
            timestamp={t.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

//sortByTimeHandler - сортировать по времени
//showFilteredHandler - показывать в зависимости от фильтра
