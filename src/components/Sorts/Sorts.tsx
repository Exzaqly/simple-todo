import {FC} from "react";
import {Select} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";


export const Sorts: FC = () => {
    const showHandleChange = (value: string) => {
        console.log(value);
    };
    const sortingHandleChange = (value: string) => {
        console.log(value);
    };

  return(
      <div>
          Show: <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={showHandleChange}
          options={[
              {
                  value: 'all',
                  label: 'All',
              },
              {
                  value: 'completed',
                  label: 'Completed',
              },
              {
                  value: 'active',
                  label: 'Active',
              },
          ]}
      />
          Sorting : <Select
          defaultValue="newest"
          style={{ width: 120 }}
          onChange={showHandleChange}
          options={[
              {
                  value: 'newest',
                  label: 'Newest',
              },
              {
                  value: 'oldest',
                  label: 'Oldest',
              }
          ]}
      />
      </div>
  )
}

