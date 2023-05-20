import axios from "axios";
import { SyntheticEvent, useRef, useEffect } from "react";

const API_KEY = "36587037-753038ed60e00b6df345da5d7";
const SearchInput = (props: { setImageData: (data: string[]) => void }) => {
  const timeout = useRef(0);
  const changeHandler = (e: SyntheticEvent) => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const el = e.target as HTMLInputElement;

      if (el.value.length > 0) {
        const res = await axios.get("https://pixabay.com/api/", {
          params: {
            key: API_KEY,
            q: encodeURIComponent(el.value),
            image_type: "photo",
            per_page: 18,
            orientation: "horizontal",
          },
        });
        props.setImageData(res.data.hits.map((it: any) => it.webformatURL));
      }
    }, 600);
  };

  useEffect(() => {
    const initialInput = async () => {
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          key: API_KEY,
          q: "ocean",
          image_type: "photo",
          per_page: 18,
          orientation: "horizontal",
        },
      });
      props.setImageData(res.data.hits.map((it: any) => it.webformatURL));
    };
    initialInput();
  }, []);

  return (
    <input
      onChange={changeHandler}
      className="rounded block my-2 py-1 bg-white w-64 text-lg text-center text-black"
    />
  );
};

export default SearchInput;
