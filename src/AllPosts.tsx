import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./App";
import { castVote } from "./cast-vote";
import { CreatePost } from "./CreatePost";
import { GetPostsResponse } from "./database.types";
import { supaClient } from "./supa-client";
import { timeAgo } from "./time-ago";
import { UpVote } from "./UpVote";
import { usePostScore } from "./use-post-score";

export function AllPosts() {
  const { session } = useContext(UserContext);
  const { pageNumber } = useParams();
  const [bumper, setBumper] = useState(0);
  const [sortOption, setSortOption] = useState<'none' | 'created_at' | 'score-low-to-high' | 'score-high-to-low'>('none');
  const [posts, setPosts] = useState<GetPostsResponse[]>([]);
  const [myVotes, setMyVotes] = useState<
    Record<string, "up" | "down" | undefined>
  >({});
  useEffect(() => {
    const queryPageNumber = pageNumber ? +pageNumber : 1;
    supaClient
      .rpc("get_posts", { page_number: queryPageNumber })
      .select("*")
      .then(({ data }) => {
        setPosts(data as GetPostsResponse[]);
        if (session?.user) {
          supaClient
            .from("post_votes")
            .select("*")
            .eq("user_id", session.user.id)
            .then(({ data: votesData }) => {
              if (!votesData) {
                return;
              }
              const votes = votesData.reduce((acc, vote) => {
                acc[vote.post_id] = vote.vote_type as any;
                return acc;
              }, {} as Record<string, "up" | "down" | undefined>);
              setMyVotes(votes);
            });
        }
      });
  }, [session, bumper, pageNumber]);

  const sortPosts = useCallback(() => {
    if (sortOption === 'created_at') {
      return [...posts].sort((a, b) => {
        const timeAgoA = timeAgo(a.created_at);
        const timeAgoB = timeAgo(b.created_at);
        if (timeAgoA < timeAgoB) {
          return -1;
        } else if (timeAgoA > timeAgoB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortOption === 'score-low-to-high') {
      return [...posts].sort((a, b) => a.score - b.score);
    } else if (sortOption === 'score-high-to-low') {
      return [...posts].sort((a, b) => b.score - a.score);
    } else {
      return posts;
    }
  }, [posts, sortOption]);

  const sortedPosts = useMemo(() => sortPosts(), [sortPosts]);

  return (
    <>
      {session && (
        <CreatePost
          newPostCreated={() => {
            setBumper(bumper + 1);
          }}
        />
      )}
      <div className="dropdown-filter">
        <label className="dropdown-filter--label">
          View posts by:
        </label>
          <select value={sortOption} onChange={e => setSortOption(e.target.value as typeof sortOption)} className="dropdown-filter--select">
            <option value="none">None</option>
            <option value="created_at">Some newer posts</option>
            <option value="score-low-to-high">Post score: Low to High</option>
            <option value="score-high-to-low">Post score: High to Low</option>
          </select>
      </div>
      <div className="posts-container">
        {sortedPosts?.map((post) => (
          <Post
            key={post.id}
            postData={post}
            myVote={myVotes?.[post.id] || undefined}
            onVoteSuccess={() => {
              setBumper(bumper + 1);
            }}
          />
        ))}
      </div>
    </>
  );
}




function Post({
  postData,
  myVote,
  onVoteSuccess,
}: {
  postData: GetPostsResponse;
  myVote: "up" | "down" | undefined;
  onVoteSuccess: () => void;
}) {
  const score = usePostScore(postData.id, postData.score);
  const { session } = useContext(UserContext);
  return (
    <div className="post-container">
      <div className="post-upvote-container">
        <UpVote
          direction="up"
          filled={myVote === "up"}
          enabled={!!session}
          onClick={async () => {
            await castVote({
              postId: postData.id,
              userId: session?.user.id as string,
              voteType: "up",
              onSuccess: () => {
                onVoteSuccess();
              },
            });
          }}
        />
        <p className="text-center" data-e2e="upvote-count">
          {score}
        </p>
        <UpVote
          direction="down"
          filled={myVote === "down"}
          enabled={!!session}
          onClick={async () => {
            await castVote({
              postId: postData.id,
              userId: session?.user.id as string,
              voteType: "down",
              onSuccess: () => {
                onVoteSuccess();
              },
            });
          }}
        />
      </div>
      <Link to={`/post/${postData.id}`} className="flex-auto">
        <p className="mt-4">
          Posted By {postData.username} {timeAgo((postData as any).created_at)}{" "}
          ago
        </p>
        <h3 className="text-2xl">{postData.title}</h3>
      </Link>
    </div>
  );
}