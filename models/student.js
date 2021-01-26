class Student {
    static a(){
        console.log('asdasd');
    }
    constructor(name, weight) {
        let getname = name;
        this.weight = weight;

        this.out = function () {
            console.log(getname, '  ', this.weight);
        }

    }
}

exports.s=Student