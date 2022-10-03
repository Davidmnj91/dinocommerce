import { ObjectId } from "@mikro-orm/mongodb";

type HasParent<T> = {id: string; parentId: ObjectId;}
type WithChildren<T> = T & {children?: WithChildren<T>[]}

export const traverse = <T extends HasParent<T>>(items: T[]): WithChildren<T>[] => {
    const hashTable = items.reduce((acc, item) => {
        acc[item.id] = {...item, children: []};
        return acc;
    }, {} as Record<string, T & {children: T[]}>)
    const dataTree = [];
    items.forEach(item => {
        if(item.parentId) {
            hashTable[item.parentId.toString()].children.push(hashTable[item.id])
        } else {
            dataTree.push(hashTable[item.id])
        }
    })

    return dataTree
}