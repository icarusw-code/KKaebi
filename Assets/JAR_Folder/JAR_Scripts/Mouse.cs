using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mouse : MonoBehaviour
{
    float rotX;
    float rotY;

    float rotSpeed = 200f;

    [SerializeField]
    Transform Campos;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float mx = Input.GetAxis("Mouse X");
        float my = Input.GetAxis("Mouse Y");

        rotX += rotSpeed * mx * Time.deltaTime;
        rotY += rotSpeed * my * Time.deltaTime;

        rotY = Mathf.Clamp(rotY, -80, 80);

        transform.localEulerAngles = new Vector3(0, rotX, 0);
        Campos.localEulerAngles = new Vector3(-rotY, 0, 0);
    }
}
