import mongoose,{Schema,Document} from "mongoose"

export interface IPlaylist extends Document{
    playlistId:string
    title:string
    description:string
    user:mongoose.Types.ObjectId
    assignments:string[]
    quizzes:any[]
    documentation:any[]

}

const PlaylistSchema = new Schema<IPlaylist>({
    playlistId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignments: [{ type: String }],
    quizzes: [{ type: Object }],
    documentation: [{ type: Object }],
  })
  
  export const Playlist = mongoose.models.Playlist || mongoose.model<IPlaylist>("Playlist", PlaylistSchema)
