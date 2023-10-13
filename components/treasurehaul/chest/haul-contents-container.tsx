"use client"

import { TreasureHaulPayload } from "@/lib/treasurehaul/treasure-haul-payload"
import clsx from "clsx";
import ItemCard from "../item-card";
import HaulOpenButton from "./open-button";
import { useDispatch } from "react-redux";
import { setDisplayedItem, setDrawerOpen } from "@/lib/store/chest-haul";
import HaulContents from "@/components/haulContents/haul-contents";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { StateOptions, useUserInfo } from "@/lib/store/user";

export type HaulContentsProps = {
  haul: TreasureHaulPayload;
  id: string;
}

export default function HaulContentsContainer(props: HaulContentsProps) {
  const {
    haul,
    id,
  } = props;

  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [users, setUsers] = useState<Extract<StateOptions, { name: string }>[]>([]);

  useEffect(() => {
    if (userInfo.type === 'loading') {
      return;
    }

    const newChannel = supabase.channel(`haul-${id}`, {
      config: {
        presence: {
          key: userInfo.id,
        }
      }
    });
    setChannel(newChannel);

    newChannel
      .on('presence', { event: 'sync' }, () => {

      })
      .subscribe();

    return () => {
      newChannel.unsubscribe();
      supabase.removeChannel(newChannel);
    }
  }, [userInfo]);

  const items = Object.entries(haul.haul)
    .map(([key, item], i) => (
      <div data-item-card key={key} className={clsx(
        'animate-fold_in',
      )} style={{
        animationDelay: `${i * 750}ms`,
        animationPlayState: 'paused',
        pointerEvents: 'none',
      }}>
        <ItemCard
          item={item}
          itemKey={key}
          onClick={() => {
            dispatch(setDisplayedItem({ item }));
            dispatch(setDrawerOpen('ViewDetails'));
          }}
        />
      </div>
    ));

  return (
    <HaulContents>
      <HaulOpenButton imageSrc={haul.previewImageSrc} />
      <button onClick={() => {
        if (!channel) {
          return;
        }

        // channel.send({
        //   type: 'broadcast',
        //   event: 'want',
        //   thingies: {
        //     one: 1,
        //     two: 'yes'
        //   }
        // });

        channel.track({
          thingies: {
            one: 1,
            two: 'yes'
          },
        });
      }}>
        TESTTESTSTST
      </button>
      {items}
    </HaulContents>
  )
}
