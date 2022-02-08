import type { ModelTypeAliases } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";

export type EditionState =
  | { status: "pending" }
  | { status: "loading" }
  | { status: "failed"; error?: unknown }
  | { status: "done"; notePage: string };

export type NoteForm = {
  text: string;
  title: string;
};

export type Event = {
  start: string;
  end: string;
  title: string;
};

export type NoteItem = {
  id: string;
  title: string;
};

export type Events = {
  notes: Array<NoteItem>;
};

export type ModelTypes = ModelTypeAliases<
  {
    BasicProfile: BasicProfile;
    Event: Event;
    Events: Events;
  },
  {
    basicProfile: "BasicProfile";
    events: "Events";
  }
  //   { placeholderNote: "Event" }
>;
