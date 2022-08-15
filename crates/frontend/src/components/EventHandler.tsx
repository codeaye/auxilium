import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import { useStore } from "../store";
import getItems from "../functions/getItems";
import { listen } from "@tauri-apps/api/event";

const ssearchTerm = (store: any) => store.searchQuery;
const sitems = (store: any) => store.items;
const sfullForm = (store: any) => store.fullForm;

const freload = (store: any) => store.reload;
const fsetItems = (store: any) => store.setItems;
const fsetLoading = (store: any) => store.setLoading;
const fsetFullForm = (store: any) => store.setFullForm;

const EventHandler = () => {
  const searchTerm = useStore(ssearchTerm);
  const items = useStore(sitems);
  const fullForm = useStore(sfullForm);

  const reload = useStore(freload);
  const setItems = useStore(fsetItems);
  const setLoading = useStore(fsetLoading);
  const setFullForm = useStore(fsetFullForm);

  useEffect(() => {
    const unlisten = listen("reload_store", (_event) => reload());

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setItems(await getItems(searchTerm));
      setLoading(false);
    })();
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      if (items.length === 0) {
        if (fullForm == true) {
          await invoke("set_mini");
          setFullForm(false);
        }
      } else {
        if (fullForm == false) {
          await invoke("set_max");
          setFullForm(true);
        }
      }
    })();
  }, [items]);

  return <></>;
};

export default EventHandler;
