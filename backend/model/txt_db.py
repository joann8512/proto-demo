
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
            line = l.split(',')[:-1] # remove last comma
            # init format with DATA
            FULL_DATA[line[0]] = DATA
            for item in line[1:]:
                FULL_DATA[line[0]][item.split('_')[0]].append(item.split('_')[1]) 
    return FULL_DATA
                   

def main():
    txt_path = '../frontend/public/from_back/Honestly/description.txt'
    txt_to_database(txt_path)

if __name__ == "__main__":
    main()