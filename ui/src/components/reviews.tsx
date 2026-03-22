import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { orpc } from "@/api";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface ReviewsProps {
  toiletId: string;
}

export function Reviews({ toiletId }: ReviewsProps) {
  const {
    data: reviews,
    isPending,
    isError,
  } = useQuery(
    orpc.review.list.queryOptions({
      input: {
        toilet_id: toiletId,
      },
    }),
  );

  if (isPending) {
    return (
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-2" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-xl">Reviews ({reviews?.length ?? 0})</h3>
      {!reviews || reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col gap-2">
              <div className="grid grid-cols-3">
                <div className="flex flex-col items-center gap-1">
                  <small>Water Pressure:</small>
                  <div className="flex">
                    {review.rating_water_pressure === 0 ? (
                      <span>💩</span>
                    ) : (
                      Array.from({ length: review.rating_water_pressure }).map(
                        (_, i) => (
                          <Star
                            // biome-ignore lint/suspicious/noArrayIndexKey: index is fine for static star arrays
                            key={i}
                            className="fill-amber-500 text-amber-500"
                            size="1rem"
                          />
                        ),
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <small>Cleanliness:</small>
                  <div className="flex">
                    {review.rating_cleanliness === 0 ? (
                      <span>💩</span>
                    ) : (
                      Array.from({ length: review.rating_cleanliness }).map((_, i) => (
                        <Star
                          // biome-ignore lint/suspicious/noArrayIndexKey: index is fine for static star arrays
                          key={i}
                          className="fill-amber-500 text-amber-500"
                          size="1rem"
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <small>Poopability:</small>
                  <div className="flex">
                    {review.rating_poopability === 0 ? (
                      <span>💩</span>
                    ) : (
                      Array.from({ length: review.rating_poopability }).map((_, i) => (
                        <Star
                          // biome-ignore lint/suspicious/noArrayIndexKey: index is fine for static star arrays
                          key={i}
                          className="fill-amber-500 text-amber-500"
                          size="1rem"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
              {review.content ? (
                <p>{review.content}</p>
              ) : (
                <p className="text-gray-400">
                  <i>No comment.</i>
                </p>
              )}
              <small className="text-gray-400">Reviewed {review.created}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
