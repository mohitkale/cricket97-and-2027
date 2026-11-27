type Gear = 'bat' | 'gloves' | 'ball';
type Marker = 'catch' | 'gather' | 'release' | 'contact' | 'ground' | 'leave' | 'stump';
type ClipRow = [name: string, seconds: number, marker?: Marker, at?: number];

export interface OverClip {
  file: string;
  duration: number;
  gear: Gear | undefined;
  markers: { name: Marker; time: number }[];
}

const bundle = (asset: string, entries: ClipRow[], gear?: Gear) =>
  entries.map(([name, duration, marker, at]): [string, OverClip] => [
    name,
    {
      file: `clips/${asset}.glb`,
      duration,
      gear,
      markers: marker && at !== undefined ? [{ name: marker, time: at }] : [],
    },
  ]);

export const OVER_CLIPS: Record<string, OverClip> = Object.fromEntries([
  ...bundle('over-movement', [
    ['Fielder_Backpedal', 20 / 30],
    ['Fielder_Sidestep', 20 / 30],
    ['Fielder_Turn', 24 / 30],
    ['Fielder_Stop', 24 / 30],
    ['Fielder_Walk_In', 1],
  ]),
  ...bundle(
    'over-movement',
    [
      ['Batter_Run', 14 / 30],
      ['Batter_Ground_Bat', 25 / 30, 'ground', 9 / 30],
      ['Batter_Dismissal_Walk', 1],
    ],
    'bat',
  ),
  ...bundle('over-slide', [
    ['Slide_Start', 25 / 30],
    ['Slide_Loop', 2],
    ['Slide_Exit', 0.5],
  ]),
  ...bundle('over-field-actions', [
    ['Field_Catch_High', 31 / 30, 'catch', 12 / 30],
    ['Field_Catch_Low', 31 / 30, 'catch', 11 / 30],
    ['Field_Pickup_Static', 35 / 30, 'gather', 12 / 30],
    ['Field_Pickup_Moving', 1, 'gather', 10 / 30],
    ['Field_Dive_Left', 43 / 30, 'gather', 16 / 30],
    ['Field_Dive_Right', 43 / 30, 'gather', 16 / 30],
  ]),
  ...bundle('over-field-actions', [['Field_Throw_Underarm', 1, 'release', 16 / 30]], 'ball'),
  ...bundle(
    'over-field-actions',
    [
      ['Keeper_Take_Low', 31 / 30, 'catch', 11 / 30],
      ['Keeper_Take_Wide', 35 / 30, 'catch', 11 / 30],
      ['Keeper_Dive', 43 / 30, 'catch', 16 / 30],
      ['Keeper_Stumping', 32 / 30, 'catch', 10 / 30],
    ],
    'gloves',
  ),
  ...bundle(
    'over-spin',
    [
      ['Bowling_Off_Spin', 36 / 30, 'release', 17 / 30],
      ['Bowling_Leg_Spin', 38 / 30, 'release', 18 / 30],
    ],
    'ball',
  ),
  ...bundle('over-officials', [
    ['Umpire_Out', 45 / 30],
    ['Umpire_Four', 49 / 30],
    ['Umpire_Six', 49 / 30],
    ['Umpire_Wide', 44 / 30],
    ['Umpire_No_Ball', 42 / 30],
    ['Umpire_Bye', 42 / 30],
    ['Umpire_Leg_Bye', 42 / 30],
    ['Umpire_Dead_Ball', 42 / 30],
    ['Bowling_Appeal', 38 / 30],
    ['Player_Celebration', 42 / 30],
  ]),
  ...(
    [
      ['straight-drive', 'Batting_Straight_Drive', 1.72, 'contact', 0.369],
      ['on-drive', 'Batting_On_Drive', 1.72, 'contact', 0.369],
      ['back-foot-defence', 'Batting_Back_Foot_Defence', 50 / 30, 'contact', 0.34],
      ['glance', 'Batting_Glance', 50 / 30, 'contact', 0.34],
      ['cut', 'Batting_Cut', 49 / 30, 'contact', 0.44],
      ['pull', 'Batting_Pull', 50 / 30, 'contact', 0.43],
      ['sweep', 'Batting_Sweep', 54 / 30, 'contact', 0.389],
      ['duck', 'Batting_Duck', 45 / 30, 'leave', 0.38],
    ] as const
  ).flatMap(([id, name, duration, marker, phase]) =>
    bundle(`batting-${id}`, [[name, duration, marker, phase * duration]], 'bat'),
  ),
]);

OVER_CLIPS.Keeper_Stumping?.markers.push({ name: 'stump', time: 16 / 30 });
