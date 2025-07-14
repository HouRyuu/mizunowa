import {Button, Card, Space} from "antd-mobile";
import {DietRecord} from "@/types/types";
import {useCallback, useEffect, useState} from "react";
import {saveDietRecord} from "@/lib/dietApi";
import {useDiaSession} from "@/context/DiaSessionContext";
import dayjs from "dayjs";

const foodList = [
    {
        meal: '朝食',
        icon: 'breakfast_dining',
        foodIcons: [
            'bakery_dining',
            'egg_alt',
            'local_cafe',
            'grocery',
            'soup_kitchen',
            'rice_bowl',
            'cookie',
        ],
    },
    {
        meal: '昼食',
        icon: 'lunch_dining',
        foodIcons: [
            'bento',
            'nutrition',
            'egg',
            'coffee',
            'washoku',
            'local_pizza',
            'fastfood',
            'ramen_dining',
            'icecream',
            'tapas',
        ],
    },
    {
        meal: '夕食',
        icon: 'dinner_dining',
        foodIcons: [
            'emoji_food_beverage',
            'yoshoku',
            'set_meal',
            'cake',
            'Okonomiyaki',
            'Liquor',
            'kebab_dining',
            'japanese_curry',
            'nightlife',
        ],
    }
];

interface Props {
    dietRecords?: DietRecord[];
}

/**
 * 飲食タブパネルコンポーネント
 * @param dietRecords 飲食記録の配列
 * @constructor
 */
export default function DietTabPanel({dietRecords = []}: Props) {
    const [mealToFoods, setMealToFoods] = useState<Record<string, Set<string>>>({});
    const {diaDate} = useDiaSession();
    const isFuture = dayjs(diaDate).isAfter(dayjs(), "day");
    // 飲食記録を基に食事のアイコンをマッピングする
    useEffect(() => {
        const mealToFoods = dietRecords.reduce((obj, {meal, foods}) => {
            obj[meal] = new Set(foods.split(',').filter(food => food.trim() !== ''));
            return obj;
        }, {} as Record<string, Set<string>>);
        setMealToFoods(mealToFoods);
    }, [dietRecords]);
    // 食事アイコンのトグル処理
    const toggleFood = useCallback((meal: string, food: string) => {
        let foodSet = mealToFoods[meal];
        if (!foodSet) {
            foodSet = new Set(food);
        } else if (foodSet.has(food)) {
            foodSet.delete(food);
        } else {
            foodSet.add(food);
        }
        mealToFoods[meal] = foodSet;
        saveDietRecord({
            dietDate: diaDate,
            meal: meal,
            foods: Array.from(foodSet).join(','),
        }).then(() => setMealToFoods({...mealToFoods}));
    }, [mealToFoods]);
    return (<section>
        {foodList.map((food, index) => (
            <Card
                key={index}
                icon={<span className="material-symbols-outlined text-blue-500 absolute top-1/2 -translate-y-1/2">{food.icon}</span>}
                extra={<span className="text-base">{food.meal}</span>}
            >
                <Space wrap>
                    {food.foodIcons.map((icon, idx) => (
                        <Button key={idx} fill='outline' shape='rounded' size='mini'
                                disabled={isFuture}
                                color={mealToFoods[food.meal]?.has(icon) ? 'primary' : 'default'}
                                onClick={() => {
                                    toggleFood(food.meal, icon)
                                }}>
                            <span className="material-symbols-outlined mx-2">{icon}</span>
                        </Button>
                    ))}
                </Space>
            </Card>
        ))}
    </section>);
};