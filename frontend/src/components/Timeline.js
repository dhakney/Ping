import React, { useState, useEffect, useRef, useCallback } from 'react';

const Timeline = () => {
  const [snaps, setSnaps] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastSnapElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/timeline?page=${page}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const { snaps: newSnaps } = await response.json();
          setSnaps((prevSnaps) => [...prevSnaps, ...newSnaps]);
          setHasMore(newSnaps.length > 0);
        } else {
          console.error('Failed to fetch timeline');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSnaps();
  }, [page]);

  return (
    <div>
      <h2>Timeline</h2>
      <ul>
        {snaps.map((snap, index) => {
          if (snaps.length === index + 1) {
            return (
              <li key={snap.id} ref={lastSnapElementRef}>
                <img src={snap.image_url} alt={snap.caption} />
                <p>{snap.caption}</p>
              </li>
            );
          } else {
            return (
              <li key={snap.id}>
                <img src={snap.image_url} alt={snap.caption} />
                <p>{snap.caption}</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Timeline;
