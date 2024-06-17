
FULL_DATA = {}

def txt_to_database():
    txt_path = '../frontend/public/from_back/Honestly/description.txt'
    with open(txt_path) as file:
        lines = [line.rstrip() for line in file]
        for l in lines:
            DATA = {'Note Density':[],
                    'Rhythm Intensity':[],
                    'Mean Velocity':[],
                    'Mean Pitch':[],
                    'Mean Duration':[],
                    'Instrument':[],
                    'Chord':[]}
            line = l.split(', ')[:-1] # remove last comma
            # init format with DATA
            FULL_DATA[line[0]] = DATA
            print(line[1:])
            for item in line[1:]:
                FULL_DATA[line[0]][item.split('_')[0]].append(item.split('_')[1]) 
    return FULL_DATA

def database_to_txt(desc_dict):
    #desc_dict = {"Bar_1": {"Note Density": ["0"], "Rhythm Intensity": "0", "Mean Velocity": ["48"], "Mean Pitch": ["16"], "Mean Duration": "32", "Instrument": "Bright Acoustic Piano", "Chord": ["E:min", "E:min7"]}, "Bar_2": {"Note Density": ["0"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["E:min7", "D:min"]}, "Bar_3": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["D:min", "C:dom7"]}, "Bar_4": {"Note Density": ["0"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["15"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["C:dom7", "A:min7"]}, "Bar_5": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["A:min7"]}, "Bar_6": {"Note Density": ["0"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["15"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["A:min7", "D:min7"]}, "Bar_7": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["D:min7", "F:maj"]}, "Bar_8": {"Note Density": ["0"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["F:maj", "B:min"]}, "Bar_9": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["A:min7", "C:maj"]}, "Bar_10": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["15"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["B:min", "F:maj"]}, "Bar_11": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["F:maj7", "C:maj", "E:min"]}, "Bar_12": {"Note Density": ["1"], "Rhythm Intensity": ["0"], "Mean Velocity": ["32"], "Mean Pitch": ["16"], "Mean Duration": ["32"], "Instrument": ["Bright Acoustic Piano"], "Chord": ["G:maj", "F:maj"]}}
    desc_list = []
    for bar in desc_dict:
        row = bar
        for item in desc_dict[bar]:
            for value in desc_dict[bar][item]:
                row = '{}, {}_{}'.format(row, item, value)
        desc_list.append(row+'\n')
    with open('../frontend/public/from_back/Honestly/description.txt', 'w') as f:
        for i in desc_list:
            f.write(i)

def main():
    #txt_path = '../frontend/public/from_back/Honestly/description.txt'
    txt_to_database()
#    database_to_txt()

if __name__ == "__main__":
    main()