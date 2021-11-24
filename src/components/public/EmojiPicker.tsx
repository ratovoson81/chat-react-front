import Picker from "emoji-picker-react";
import useOnclickOutside from "react-cool-onclickoutside";

const EmojiPicker = ({ onEmojiClick, togglePicker }: any) => {
  const ref = useOnclickOutside(() => {
    togglePicker(false);
  });
  return (
    <span className="absolute bottom-16 right-16" ref={ref}>
      <Picker
        onEmojiClick={onEmojiClick}
        disableSearchBar={true}
        disableSkinTonePicker={true}
        groupNames={{
          smileys_people: "smileys",
          animals_nature: "animaux",
          food_drink: "food",
          travel_places: "Voyage",
          activities: "Activité",
          objects: "objects",
          symbols: "symbols",
          flags: "Drapeaux",
          recently_used: "Dernière utilisation",
        }}
      />
    </span>
  );
};

export default EmojiPicker;
