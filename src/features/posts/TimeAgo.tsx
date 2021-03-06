import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { TimeAgoProps } from "../../types/types";

export const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  } else {
    timeAgo = "No record of the time";
  }

  return (
    <span title={timestamp}>
      <i>{timeAgo}</i>
    </span>
  );
};
