let rooms = {}

function add(name){
	if(!("my_room" in rooms)) rooms["my_room"] = {}
	rooms["my_room"][name] = {}
}

for (i = 0; i < 10; i++) add(`name_${i}`)


console.log(rooms)